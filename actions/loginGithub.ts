// actions/loginGithub.ts
import axios from 'axios';
import { z } from 'zod';
import { db } from '@/lib/db/drizzle';
import { users } from '@/lib/db/schema';
import { setSession } from '@/lib/auth/session';
import { eq } from 'drizzle-orm';

export const githubLoginSchema = z.object({
  code: z.string(),
});

export const githubLogin = async (code: string) => {
  try {
    const response = await axios.post<{ access_token: string }>(
      'https://github.com/login/oauth/access_token',
      {
        client_id: "Ov23li3w91usHIwvaBE6",
        client_secret: "6c8abb95996a536ea6f450423ece77679762319e",
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    );

    const { access_token } = response.data;

    if (!access_token) {
      return { response: 'error', message: 'Error al obtener el token de acceso de GitHub.' };
    }

    const userResponse = await axios.get<any>('https://api.github.com/user', {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const githubUser = userResponse.data;

    if (!githubUser) {
      return { response: 'error', message: 'Error al obtener los datos del usuario de GitHub.' };
    }

    let email = githubUser.email;

    if (!email) {
      const emailResponse = await axios.get<any>('https://api.github.com/user/emails', {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      const primaryEmail = emailResponse.data.find(
        (email: { primary: boolean; verified: boolean; email: string }) => email.primary && email.verified
      );

      email = primaryEmail?.email || null;

      if (!email) {
        console.warn('No se encontró un correo principal o verificado para el usuario:', githubUser.login);
      }
    }

    let user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (user.length === 0) {
      console.log('Creating user:', githubUser);

      await db.insert(users).values({
        full_name: githubUser.name || githubUser.login,
        email: email,
        password: '',
        role: 'cliente',
        birthdate: null,
        address: null,
        phone_number: null,
        gender: null,
        terms_accepted: true,
      });

      user = await db
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);
    }

    await setSession(user[0]);

    return { response: 'success', message: 'Inicio de sesión correcto', user: user[0] };
  } catch (error: any) {
    console.error('Error en la autenticación con GitHub:', error.response?.data || error.message);
    return { response: 'error', message: 'Error durante la autenticación con GitHub.' };
  }
};

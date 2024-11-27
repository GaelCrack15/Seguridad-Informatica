import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { githubLogin } from '@/actions/loginGithub';
import { NextRequest } from 'next/server';

// Manejador para la autenticación con GitHub
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No authorization code provided.' }, { status: 400 });
  }

  try {
    const response = await githubLogin(code);

    if (response.response === 'success') {
      return NextResponse.redirect(new URL('/dashboard', req.url));
    } else {
      return NextResponse.json({ error: response.message }, { status: 500 });
    }
  } catch (error) {
    console.error('Error en GitHub login:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Manejador para el envío de correos
export async function POST(req: Request) {
  try {
    const body = await req.json(); // Leer el cuerpo de la solicitud
    const { user } = body;

    if (!user) {
      return NextResponse.json({ error: 'Falta el ID en el cuerpo de la solicitud' }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.mailtrap.io',
      port: 587,
      auth: {
        user: '03d6fa234696d8', // Usuario de Mailtrap
        pass: '60e1a57cdd578f', // Contraseña de Mailtrap
      },
    });

    const mailOptions = {
      from: 'adminify@adminify.com',
      to: `${user.email}`,
      subject: `SALUDO CORDIAL`,
      text: `¡Hola! Es un placer saludarlo: ${user.full_name}.`,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Correo enviado:', info.messageId);
    return NextResponse.json({ message: 'Correo enviado', info, user });
  } catch (error) {
    console.error('Error al enviar correo:', error);
    return NextResponse.json({ error: 'Error al enviar correo' }, { status: 500 });
  }
}

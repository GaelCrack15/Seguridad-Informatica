// app/api/auth/github/callback/route.ts
'use server';

import { NextResponse } from 'next/server';
import { githubLogin } from '@/actions/loginGithub';  // Asegúrate de que esta función sea async
import { NextRequest } from 'next/server';

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

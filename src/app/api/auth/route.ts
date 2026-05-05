import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const SESSION_COOKIE_NAME = 'admin_session';

// Helper to verify credentials (could be more complex, but using env for now)
const verifyCredentials = (email: string, pass: string) => {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@primotech.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    return email === adminEmail && pass === adminPassword;
};

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();

        if (verifyCredentials(email, password)) {
            // Set session cookie
            const cookieStore = await cookies();
            cookieStore.set(SESSION_COOKIE_NAME, 'authenticated', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24, // 24 hours
                path: '/',
            });

            return NextResponse.json({
                success: true,
                message: 'Login successful'
            });
        } else {
            return NextResponse.json({
                success: false,
                message: 'Invalid email or password'
            }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error'
        }, { status: 500 });
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies();
        const session = cookieStore.get(SESSION_COOKIE_NAME);

        if (session && session.value === 'authenticated') {
            return NextResponse.json({ success: true, authenticated: true });
        }

        return NextResponse.json({ success: true, authenticated: false }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Auth check failed' }, { status: 500 });
    }
}

export async function DELETE() {
    try {
        const cookieStore = await cookies();
        cookieStore.delete(SESSION_COOKIE_NAME);
        return NextResponse.json({ success: true, message: 'Logged out' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Logout failed' }, { status: 500 });
    }
}

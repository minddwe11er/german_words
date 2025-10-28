// app/api/recaptcha/route.js
import { NextResponse } from 'next/server';
import { createAssessment } from '@/lib/recaptcha';

export async function POST(request) {
    try {
        const { token, action } = await request.json();
        if (!token || !action) {
            return NextResponse.json({ error: 'Token or actions is missing' }, { status: 400 });
        }

        const score = await createAssessment({
            projectID: "words-36e6e",
            recaptchaKey: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
            token,
            recaptchaAction: action,
        });

        if (score === null) {
            return NextResponse.json({ error: "Rate didn't complete" }, { status: 400 });
        }

        return NextResponse.json({ score }, { status: 200 });
    } catch (error) {
        console.error('Error API:', error);
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
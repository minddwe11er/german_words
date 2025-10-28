export const verifyRecaptcha = async (token) => {
    const secret = process.env.RECAPTCHA_SECRET_KEY;
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ secret, response: token }),
    });
    const data = await response.json();
    return data.success && data.score > 0.5;
};
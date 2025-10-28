export const createAssessment = async (token) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return { success: false, error: 'Secret key not found' };
  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token }),
  });
  const data = await response.json();
  return { success: data.success, score: data.score };
};
// lib/recaptcha.js
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

// Ініціалізація клієнта (кешуємо для повторного використання)
const client = new RecaptchaEnterpriseServiceClient();

/**
 * Create an assessment to analyze the risk of a UI action.
 * @param {Object} options - Параметри для оцінки.
 * @param {string} options.projectID - Твій Google Cloud Project ID (наприклад, "words-36e6e").
 * @param {string} options.recaptchaKey - Твій reCAPTCHA site key.
 * @param {string} options.token - Токен, отриманий від клієнта.
 * @param {string} options.recaptchaAction - Дія, яка відповідає токену.
 * @returns {Promise<number|null>} - Ризик-скор (score) або null, якщо оцінка не вдалася.
 */

export async function createAssessment({
    projectID = "words-36e6e",
    recaptchaKey = "6LcIH-MrAAAAAJBwfUPeSxwGZOUZOS5Yavh1GF2X", // Твій site key
    token = "action-token", // Токен від клієнта (заміни на реальний)
    recaptchaAction = "action-name", // Дія, яку перевіряємо
} = {}) {
    try {
        const projectPath = client.projectPath(projectID);

        // Будуємо запит для оцінки
        const request = {
            assessment: {
                event: {
                    token,
                    siteKey: recaptchaKey,
                },
            },
            parent: projectPath,
        };

        // Виклик API для створення оцінки
        const [response] = await client.createAssessment(request);

        // Перевіряємо валідність токена
        if (!response.tokenProperties.valid) {
            console.log(`Помилка оцінки: токен не валідний. Причина: ${response.tokenProperties.invalidReason}`);
            return null;
        }

        // Перевіряємо, чи дія відповідає очікуваній
        if (response.tokenProperties.action === recaptchaAction) {
            // Отримуємо ризик-скор і причини
            console.log(`Ризик-скор reCAPTCHA: ${response.riskAnalysis.score}`);
            response.riskAnalysis.reasons.forEach((reason) => {
                console.log(`Причина: ${reason}`);
            });
            return response.riskAnalysis.score;
        } else {
            console.log(`Дія "${response.tokenProperties.action}" не збігається з очікуваною "${recaptchaAction}"`);
            return null;
        }
    } catch (error) {
        console.error('Помилка при створенні оцінки reCAPTCHA:', error);
        return null;
    }
}
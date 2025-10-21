const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
admin.initializeApp(); // Доступ до RTDB

// Тригер: щодня опівночі (UTC)
exports.selectDailyWord = onSchedule("0 0 * * *", async (event) => {
    const rtdb = admin.database(); // Realtime DB

    try {
        // 1. Отримуємо список слів з /words
        const wordsRef = rtdb.ref('words');
        const wordsSnapshot = await wordsRef.once('value');
        const wordsData = wordsSnapshot.val();
        if (!wordsData || Object.keys(wordsData).length === 0) {
            console.log('Немає слів у /words');
            return;
        }

        // 2. Перетворюємо об’єкти в масив для індексації
        const wordsArray = Object.values(wordsData);
        console.log(wordsArray)
        // 3. Обчислюємо індекс для дня
        const now = new Date();
        const dayIndex = now.getDate() % wordsArray.length;
        const newWord = wordsArray[dayIndex];

        // 4. Читаємо поточне today (якщо є)
        const currentTodayRef = rtdb.ref('dailyWord/today');
        const currentTodaySnapshot = await currentTodayRef.once('value');
        const currentTodayData = currentTodaySnapshot.val();

        // 5. Переносимо today в yesterday
        if (currentTodayData) {
            await rtdb.ref('dailyWord/yesterday').set({
                ...currentTodayData,
                movedAt: now.toISOString()
            });
            console.log('Yesterday оновлено з попереднього today');
        }

        // 6. Оновлюємо today новим словом
        await currentTodayRef.set({
            word: newWord.word || 'Немає слова',
            translation: newWord.english || '',
            transcription: newWord.transcription || '',
            description: newWord.description || '',
            examples: newWord.examples || '',
            date: now.toISOString()
        });

        console.log(`Слово дня оновлено: ${newWord.word} на ${now.toDateString()}`);
    } catch (error) {
        console.error('Помилка оновлення:', error);
    }
});
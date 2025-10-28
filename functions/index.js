const { onSchedule } = require("firebase-functions/v2/scheduler");
const admin = require("firebase-admin");
admin.initializeApp(); // Доступ до RTDB

// Day trigger (UTC)
exports.selectDailyWord = onSchedule("0 0 * * *", async (event) => {
    const rtdb = admin.database(); // Realtime DB

    try {
        const wordsRef = rtdb.ref('words');
        const wordsSnapshot = await wordsRef.once('value');
        const wordsData = wordsSnapshot.val();
        if (!wordsData || Object.keys(wordsData).length === 0) {
            console.log('No words in /words');
            return;
        }

        // Data check
        const wordsArray = Object.values(wordsData);
        console.log(wordsArray)
        // Getting index for a word
        const now = new Date();
        const dayIndex = now.getDate() % wordsArray.length;
        const newWord = wordsArray[dayIndex];

        const currentTodayRef = rtdb.ref('dailyWord/today');
        const currentTodaySnapshot = await currentTodayRef.once('value');
        const currentTodayData = currentTodaySnapshot.val();

        // TOday yesterday replace
        if (currentTodayData) {
            await rtdb.ref('dailyWord/yesterday').set({
                ...currentTodayData,
                movedAt: now.toISOString()
            });
            console.log('Yesterday updated from previous today');
        }

        // Today update
        await currentTodayRef.set({
            word: newWord.word || 'No word',
            translation: newWord.translation || '',
            transcription: newWord.transcription || '',
            description: newWord.description || '',
            examples: newWord.examples || '',
            date: now.toISOString()
        });

        console.log(`Word of the day updated: ${newWord.word} on ${now.toDateString()}`);
    } catch (error) {
        console.error('Update error:', error);
    }
});
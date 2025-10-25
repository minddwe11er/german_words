import { initializeApp } from "firebase/app";
import { getDatabase, ref, get, push, onValue, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
	authDomain: "words-36e6e.firebaseapp.com",
	databaseURL: 'https://words-36e6e-default-rtdb.europe-west1.firebasedatabase.app/',
	projectId: "words-36e6e",
	storageBucket: "words-36e6e.firebasestorage.app",
	messagingSenderId: "61253078009",
	appId: "1:61253078009:web:3ed8014c2795791ad14b28",
	measurementId: "G-CF8PVLZPE0",
};

const app = initializeApp(firebaseConfig);
const rtdb = getDatabase(app);
export const auth = getAuth(app);

export const fetchWord = async () => {
	try {
		const snapshot = await get(ref(rtdb, `dailyWord/`));
		if (snapshot.exists()) {
			return Object.values(snapshot.val())
		} else {
			console.log('No data available at /dailyWord/');
			return null;
		}
	} catch (error) {
		console.error('Error connect to RTDB:', error);
		return null;
	}
};

export const addFavorite = async (userId, wordObject) => {
	try {
		const favoritesRef = ref(rtdb, `users/${userId}/favorites`);
		await push(favoritesRef, wordObject); // Push додає з унікальним ключем (-Nxxxx)
		console.log('Слово додано в обране');
		console.log()
	} catch (error) {
		console.error('Помилка додавання:', error);
	}
};


export const removeFavorite = async (userId, wordToRemove) => {
	try {
		const favoritesRef = ref(rtdb, `users/${userId}/favorites`);
		const snapshot = await get(favoritesRef);
		const favorites = snapshot.val() || {};
		const updatedFavorites = {};
		Object.keys(favorites).forEach(key => {
			if (favorites[key].date !== wordToRemove.date) { // Видаляємо по date (унікальне поле)
				updatedFavorites[key] = favorites[key];
			}
		});
		await set(favoritesRef, updatedFavorites);
		console.log('Слово видалено з обраного');
	} catch (error) {
		console.error('Помилка видалення:', error);
	}
};


export const getFavorites = (userId, callback) => {
	const favoritesRef = ref(rtdb, `users/${userId}/favorites`);
	return onValue(favoritesRef, (snapshot) => {
		const data = snapshot.val() || {};
		const favoritesArray = Object.values(data); // Масив об’єктів слів
		callback(favoritesArray);
	});
};

export const checkFavorite = async (userId, wordObject) => {
	try {
		const favoritesRef = ref(rtdb, `users/${userId}/favorites`);
		const snapshot = await get(favoritesRef);
		const favorites = snapshot.val() || {};
		const favoritesArray = Object.values(favorites);
		return favoritesArray.some(fav => fav.date === wordObject.date); // По date
	} catch (error) {
		console.error('Помилка перевірки:', error);
		return false;
	}
};
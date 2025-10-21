import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getDatabase, ref, get } from 'firebase/database';
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
const db = getFirestore(app);
const rtdb = getDatabase(app);
export const auth = getAuth(app);

// export const initializeAppCheck = () => {
// 	if (typeof window !== 'undefined') {
// 		const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
// 		if (!recaptchaSiteKey) {
// 			console.error('recaptchaSiteKey не знайдено в .env.local');
// 			return;
// 		}

// 		const script = document.createElement('script');
// 		script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
// 		script.async = true;
// 		script.onload = () => {
// 			import('firebase/app-check').then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
// 				window.grecaptcha.ready(() => {
// 					const appCheck = initializeAppCheck(app, {
// 						provider: new ReCaptchaV3Provider(recaptchaSiteKey),
// 						isTokenAutoRefreshEnabled: true,
// 					});
// 					console.log('App Check initialized:', appCheck);
// 				});
// 			}).catch((error) => {
// 				console.error('Помилка завантаження App Check:', error);
// 			});
// 		};
// 		document.head.appendChild(script);
// 	}
// };

export const fetchWord = async () => {
	try {
		const snapshot = await get(ref(rtdb, `dailyWord/today`));
		if (snapshot.exists()) {
			return snapshot.val();
		} else {
			console.log('No data available at /dailyWord/today');
			return null;
		}
	} catch (error) {
		console.error('Error connect to RTDB:', error);
		return null;
	}
};
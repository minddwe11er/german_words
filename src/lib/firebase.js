import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { ReCaptchaV3Provider } from 'firebase/app-check';

const firebaseConfig = {
	apiKey: "AIzaSyAl-X48dybjKw5uSDwoOPe9_BfqhJovXxM",
	authDomain: "words-36e6e.firebaseapp.com",
	projectId: "words-36e6e",
	storageBucket: "words-36e6e.firebasestorage.app",
	messagingSenderId: "61253078009",
	appId: "1:61253078009:web:3ed8014c2795791ad14b28",
	measurementId: "G-CF8PVLZPE0"
};

const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// Ініціалізація App Check (перед getFirestore!)
export const initializeAppCheck = (recaptchaSiteKey) => {
	if (typeof window !== 'undefined') { // Тільки на клієнті
		import('firebase/app-check').then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
			const appCheck = initializeAppCheck(app, {
				provider: new ReCaptchaV3Provider(recaptchaSiteKey),
				isTokenAutoRefreshEnabled: true
			});
		});
	}
};

export const db = getFirestore(app);
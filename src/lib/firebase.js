import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection } from "firebase/firestore";
import { getDatabase, ref, get, child } from 'firebase/database';

const firebaseConfig = {
	apiKey: "AIzaSyAl-X48dybjKw5uSDwoOPe9_BfqhJovXxM",
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
const rtdb = getDatabase(app)

export const initializeAppCheck = (recaptchaSiteKey) => {
	if (typeof window !== 'undefined') {
		import('firebase/app-check').then(({ initializeAppCheck, ReCaptchaV3Provider }) => {
			const appCheck = initializeAppCheck(app, {
				provider: new ReCaptchaV3Provider(recaptchaSiteKey),
				isTokenAutoRefreshEnabled: true
			});
		});
	}
};

export const getWords = async () => {
	const querySnapshot = await getDocs(collection(db, 'words'))
	return querySnapshot
}

export const fetchWords = async () => {
	// const snapshot = await get(ref(rtdb, `words/${Math.floor(Math.random() * 20)}`));
	const snapshot = await get(ref(rtdb, `words/6`));
	if (snapshot.exists()) {
		return snapshot.val();
	} else {
		console.log("No data available");
	}
}
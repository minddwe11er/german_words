'use client'

import Image from "next/image";
import styles from "./page.module.css";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { initializeAppCheck, db } from "../lib/firebase.js";

export default function Home() {
	const [word, setWord] = useState('')

	useEffect(() => {
		initializeAppCheck('6LcIH-MrAAAAAJBwfUPeSxwGZOUZOS5Yavh1GF2X')

		getWords().then(data => {
			const wordFromDb = data.docs.map(doc => ({ id: doc.id, word: doc.data().word }))
			setWord(wordFromDb[0].word)
		})
	}, [])

	return (
		<div>{word}</div>
	);
}

const getWords = async () => {
	const querySnapshot = await getDocs(collection(db, 'words'))
	return querySnapshot
}
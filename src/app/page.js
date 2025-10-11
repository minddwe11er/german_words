'use client'

import styles from "./page.module.css";
import Card from '../components/Card.js'

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { initializeAppCheck, db } from "../lib/firebase.js";

export default function Home() {
	const [word, setWord] = useState('')

	useEffect(() => {
		initializeAppCheck(`${process.env.APPCHECK}`)

		getWords().then(data => {
			const wordFromDb = data.docs.map(doc => ({ id: doc.id, word: doc.data().word }))
			setWord(wordFromDb[0].word)
		})
	}, [])

	const buttonHandler = (event) => {
		event.preventDefault()
	}

	return (
		<div className={styles.outer}>
			<section id="container">
				<div className={styles.about}>
					<div className={styles.title}>
						<h1>German word of the day.</h1>
					</div>
					<div className={styles.description}>
						Only for you, one German word a day to make it easier and better to remember.
					</div>
					<div className={styles.subscription}>
						<span>To subscribe to the daily newsletter, please provide your email.</span>
						<form action="" onSubmit={() => null}>
							<input type="text" placeholder="example@mail.com" />
							<button onClick={buttonHandler}>Subscribe</button>
						</form>
					</div>
				</div>

				<div className={styles.content}>
					{<Card word={word} />}
				</div>
			</section>
		</div>
	);
}

const getWords = async () => {
	const querySnapshot = await getDocs(collection(db, 'words'))
	return querySnapshot
}
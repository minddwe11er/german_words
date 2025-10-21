'use client'

import styles from "./page.module.css";
import Card from '../components/Card.js'

import { useEffect, useState } from "react";
import { initializeAppCheck, fetchWord } from "../lib/firebase.js";

export default function Home() {
	const [data, setData] = useState({})

	useEffect(() => {

		initializeAppCheck(`${process.env.APPCHECK}`)
		fetchWord().then(setData)
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
					{<Card {...data} />}
				</div>
			</section>
		</div>
	);
}
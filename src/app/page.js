'use client'

import styles from "./page.module.css";
import Card from '../components/Card.js'
import { Login } from "../components/Login.js";
import Loader from '@/components/Loader'

import { useEffect, useState, useRef } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { fetchWord, auth } from "../lib/firebase.js";

export default function Home() {
	const [user, setUser] = useState(null);
	const [data, setData] = useState([])
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState('loading');
	const [activeTab, setActiveTab] = useState(0)
	const [isTransitioning, setIsTransitioning] = useState(false)
	const nodeRef = useRef(null)

	useEffect(() => {
		if (typeof window !== 'undefined' && window.grecaptcha?.enterprise) {
			window.grecaptcha.enterprise.ready(() => {
				window.grecaptcha.enterprise.execute(
					process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
					{ action: 'homepage' }
				).then((newToken) => {
					setToken(newToken);
				});
			});
		}

		//Add Word of the day from DB
		fetchWord().then(setData)
	}, [])

	useEffect(() => {
		setLoading('loading')
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading('finished')
		});
		return () => unsubscribe();
	}, []);

	const checkRecaptcha = async () => {
		if (!token) return;
		const response = await fetch('/api/recaptcha', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token, action: 'homepage' }),
		});
		const data = await response.json();
		console.log('Recaptcha score:', data.score);
	};

	const handleGoogleLogin = async (event) => {
		event.preventDefault()
		const provider = new GoogleAuthProvider();
		try {
			await signInWithPopup(auth, provider);
			console.log('Succsesfull login via Google!');
		} catch (error) {
			console.error('Login error:', error.message);
		}
	};

	const handleLogout = async (event) => {
		event.preventDefault()
		try {
			await signOut(auth);
			console.log('Logout complete');
		} catch (error) {
			console.error('Logout error:', error.message);
		}
	};

	const activeTabHandler = (index) => {
		setIsTransitioning(true)
		setActiveTab(index)
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
					{/* <img src="../../public/logo.png" alt="logo" /> */}
					<div className={styles.login}>
						{loading == 'loading' ? <Loader /> : <Login loading={loading} user={user} handleGoogleLogin={handleGoogleLogin} handleLogout={handleLogout} />}
					</div>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.content}>
						<div className={styles.grad}></div>
						<div className={styles.tabs}>
							{data && data.map((item, index) => <button style={index === activeTab ? { backgroundColor: '#FFF' } : {}} key={index} onClick={() => activeTabHandler(index)}>{index ? 'Yesterday' : 'Today'}</button>)}
						</div>
						<Card {...data[activeTab]} wordObject={data[activeTab]} />
					</div>
				</div>
			</section >
		</div >
	);
}
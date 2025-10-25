import styles from './Card.module.css';
import Spinner from './Spinner';

import { useEffect, useState } from 'react';

import { addFavorite, removeFavorite, checkFavorite } from '../lib/firebase'; // Шлях адаптуй
import { auth } from '../lib/firebase';

export default function Card({ word, translation, transcription, description, examples, wordObject }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loadingFavorite, setLoadingFavorite] = useState(false);
    const user = auth.currentUser;
    useEffect(() => {
        if (user && wordObject) {
            checkFavorite(user.uid, wordObject).then(setIsFavorite);
        }
    }, [user, wordObject]);

    const toggleFavorite = async () => {
        if (!user) {
            console.log('Not autorized user:', user);
            return;
        }
        console.log('User UID:', user.uid);
        setLoadingFavorite(true);
        if (isFavorite) {
            try {
                await removeFavorite(user.uid, wordObject);
                setIsFavorite(false);
                console.log('Deleted:', wordObject.date);
            } catch (error) {
                console.error('Delete Error:', error);
            }
        } else {
            try {
                console.log('Add take:', wordObject.date, 'Path:', `users/${user.uid}/favorites/${wordObject.date}`);
                await addFavorite(user.uid, wordObject); // Передаємо повний об'єкт
                setIsFavorite(true);
                console.log('Added:', wordObject.date);
            } catch (error) {
                console.error('Add Error:', error);
            }
        }
        setLoadingFavorite(false);
    };


    return word ? (
        <div className={styles.content}>
            <main>
                <div className={styles.words}>
                    <div className={styles.word}>{word}</div>
                    <div className={styles.transcription}>{transcription}</div>
                    <div className={styles.translation}>{translation}</div>
                </div>
                <h3>Description</h3>
                <div className={styles.description}>
                    {description}
                </div>
                <h3>Examples</h3>
                <div className={styles.examples}>
                    <ul>
                        {examples.map((item, index) => <Example {...item} key={index} />)}
                    </ul>
                </div>
                <button
                    onClick={toggleFavorite}
                    className={`${styles.favoriteButton} ${isFavorite ? styles.active : ''}`}
                    disabled={loadingFavorite}
                >
                    {loadingFavorite ? '...' : (isFavorite ? 'Видалити з обраного' : 'Додати в обране')}
                </button>
            </main>
        </div >
    ) : <Spinner />
}

const Example = ({ english, german }) => {
    return (
        <>
            <li>{german}</li>
            <span>{english}</span>
        </>
    )
}

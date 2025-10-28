import styles from './Card.module.css';
import Checkbox from './Checkbox.js';
import Voice from './Voice'
import RemoveButton from './Remove';

import { useEffect, useState } from 'react';
import { useSpeech } from "react-text-to-speech";

import { addFavorite, removeFavorite, checkFavorite } from '../lib/firebase';
import { auth } from '../lib/firebase';

export default function Card({ word, translation, transcription, description, examples, wordObject, favorites, loadingFavorites }) {
    const [isFavorite, setIsFavorite] = useState(false);
    const [loadingFavorite, setLoadingFavorite] = useState(false);
    const user = auth.currentUser;

    const {
        Text,
        speechStatus,
        isInQueue,
        start,
        pause,
        stop,
    } = useSpeech({ text: word, lang: "de-DE", pitch: 2, rate: 0.5, volume: 2 });

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
                await addFavorite(user.uid, wordObject);
                setIsFavorite(true);
                console.log('Added:', wordObject.date);
            } catch (error) {
                console.error('Add Error:', error);
            }
        }
        setLoadingFavorite(false);
    };

    const speechHandler = () => {
        if (speechStatus == 'started') {
            stop();
        }
        start();
    }

    const removeHandler = (object) => {
        if (user) {
            removeFavorite(user.uid, object);
        }
    }

    const Word = () => {
        return (
            <>
                <div className={styles.words}>
                    <div className={styles.word}>
                        <div className={styles.wrapper}>
                            <Text />
                            <Voice handler={speechHandler} />
                        </div>
                        {user && <Checkbox handler={toggleFavorite} disabled={loadingFavorite} isChecked={isFavorite} />}
                    </div>
                    <div className={styles.transcription}>{transcription}</div>
                    <div className={styles.translation}>{translation}</div>
                </div>
                <div className={styles.description}>
                    {description}
                </div>
                <hr />
                <div className={styles.examples}>
                    {examples.map((item, index) => <Example {...item} key={index} />)}
                </div>
            </>
        )
    }

    const Favorites = ({ favorites }) => {
        return (
            <>
                <div>
                    {favorites.map((item, index) => <div className={styles.item} key={index}>
                        <div>
                            <div className={styles.word}>
                                {item.word}
                            </div>
                            <div className={styles.transcription}>{item.transcription}</div>
                            <div className={styles.translation}>{item.translation}</div>
                        </div>
                        <div>
                            <RemoveButton handler={removeHandler} object={item} />
                        </div>
                    </div>)}
                </div>
            </>
        )
    }

    return (
        <main>
            {word ? <Word /> : <Favorites favorites={favorites} />}
        </main>)
}

const Example = ({ english, german }) => {
    return (

        <div>
            <span>{german}</span>
            <span>{english}</span>
        </div>
    )
}

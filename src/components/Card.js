import styles from './Card.module.css';
import Spinner from './Spinner';

export default function Card({ word, translation, transcription, description, examples }) {
    return word ? (
        <div className={styles.content}>
            <main>
                <div className={styles.words}>
                    <div className={styles.word}>
                        {
                            word
                        }
                    </div>
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
            </main>
        </div>
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

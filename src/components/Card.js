import styles from './Card.module.css';

export default function Card({ word, translation, description, examples }) {

    return (
        <div className={styles.content}>

            <main>
                <div className={styles.words}>
                    <div className={styles.word}>{word}</div>
                    <div className={styles.translation}>Hello</div>
                </div>
                <div className={styles.transcription}>[ˈgryːɛtsi]</div>
                <h3>Description</h3>

                <div className={styles.description}>
                    Grüezi is a traditional Swiss German greeting used in the German-speaking
                    parts of Switzerland, meaning "Hello" or "Good day." It is a polite way to greet one person,
                    while Grüezi mitenand is used for a group. Commonly heard in shops, streets, or offices, it
                    suits both formal and informal settings.
                </div>
                <h3>Examples</h3>

                <div className={styles.examples}>
                    <ul>

                    </ul>
                </div>
                { }
            </main>
        </div>
    )
}

const Example = ({ item }) => {
    return (
        <li>{item}</li>
    )
}

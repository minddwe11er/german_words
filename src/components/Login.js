import styles from "./Login.module.css";
import Spinner from "./Spinner";

export function Login({ user, handleGoogleLogin, handleLogout }) {
    return (
        <div className={styles.container}>
            <div className={styles.announce}>{user ? (<span>Welcome back, {user.displayName}</span>) : <span>Pleas login for more features</span>}</div>
            {!user && <button onClick={handleGoogleLogin}>Login</button>}
            {user && <button onClick={handleLogout}>Logout</button>}
        </div>
    )
}


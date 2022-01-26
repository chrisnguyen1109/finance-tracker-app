import { useState } from 'react';
import useFirebaseFetch from '../../hooks/useFirebaseFetch';
import styles from './Signup.module.css';
import { useDispatch } from 'react-redux';
import { signUpAcion } from '../../redux/authActions';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const { loading, error, fetchData } = useFirebaseFetch();
    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        if (loading) return;

        dispatch(
            signUpAcion(
                fetchData,
                res => {
                    setEmail('');
                    setPassword('');
                    setDisplayName('');
                },
                email,
                password,
                displayName
            )
        );
    };

    return (
        <form onSubmit={submitHandler} className={styles['signup-form']}>
            <h2>Sign up</h2>
            <label>
                <span>Email:</span>
                <input
                    type="email"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                    autoComplete="new-password"
                    required
                />
            </label>
            <label>
                <span>Password:</span>
                <input
                    type="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                    minLength="6"
                    required
                />
            </label>
            <label>
                <span>Display name:</span>
                <input
                    type="text"
                    onChange={e => setDisplayName(e.target.value)}
                    value={displayName}
                    required
                />
            </label>
            <button className="btn">{loading ? 'Loading' : 'Sign up'}</button>
            {error && <p className="text-error">{error.message}</p>}
        </form>
    );
}

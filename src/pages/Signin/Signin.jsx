import styles from './Signin.module.css';
import { useState } from 'react';
import useFirebaseFetch from '../../hooks/useFirebaseFetch';
import { useDispatch } from 'react-redux';
import { signInAcion, signInProviderAcion } from '../../redux/authActions';
import { facebookProvider, googleProvider } from '../../firebase/config';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading, error, fetchData, setError } = useFirebaseFetch();
    const {
        loading: loadingFb,
        error: errorFb,
        fetchData: fetchDataFb,
        setError: setErrorFb,
    } = useFirebaseFetch();
    const {
        loading: loadingGg,
        error: errorGg,
        fetchData: fetchDataGg,
        setError: setErrorGg,
    } = useFirebaseFetch();
    const dispatch = useDispatch();

    const submitHandler = e => {
        e.preventDefault();
        if (loading) return;

        dispatch(
            signInAcion(
                fetchData,
                res => {
                    if (!res) {
                        setError(new Error('Could not complete signin!'));
                        return;
                    }

                    setEmail('');
                    setPassword('');
                },
                email,
                password
            )
        );
    };

    const handleLoginGg = () => {
        if (loadingGg) return;

        dispatch(
            signInProviderAcion(
                fetchDataGg,
                res => {
                    if (!res) {
                        setErrorGg(
                            new Error('Could not complete signin with google!')
                        );
                        return;
                    }
                },
                googleProvider
            )
        );
    };

    const handleLoginFb = () => {
        if (loading) return;

        dispatch(
            signInProviderAcion(
                fetchDataFb,
                res => {
                    if (!res) {
                        setErrorFb(
                            new Error('Could not complete signin with google!')
                        );
                        return;
                    }
                },
                facebookProvider
            )
        );
    };

    return (
        <form onSubmit={submitHandler} className={styles['login-form']}>
            <h2>Sign in</h2>
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
            <button className="btn" type="submit">
                {loading ? 'Loading' : 'Sign in'}
            </button>
            {error && <p className="text-error">{error.message}</p>}
            <button
                className="btn btn--fb"
                type="button"
                onClick={handleLoginFb}
            >
                {loadingFb ? 'Loading' : 'Sign in with facebook'}
            </button>
            {errorFb && <p className="text-error">{errorFb.message}</p>}
            <button
                className="btn btn--gg"
                type="button"
                onClick={handleLoginGg}
            >
                {loadingGg ? 'Loading' : 'Sign in with google'}
            </button>
            {errorGg && <p className="text-error">{errorGg.message}</p>}
        </form>
    );
}

import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import useFirebaseFetch from '../../hooks/useFirebaseFetch';
import { signOutAction } from '../../redux/authActions';
import styles from './Navbar.module.css';

export default function Navbar() {
    const dispatch = useDispatch();
    const { loading, fetchData } = useFirebaseFetch();
    const currentUser = useSelector(state => state.auth.currentUser);

    const logoutHandler = () => dispatch(signOutAction(fetchData));

    const activeLink = ({ isActive }) => {
        return {
            color: isActive ? '#2c9b2c' : '',
            textDecoration: isActive ? 'underline' : '',
        };
    };

    return (
        <nav className={styles.navbar}>
            <ul>
                <Link to="/" className={styles.title}>
                    Finance Tracker App
                </Link>

                {!currentUser && (
                    <>
                        <li>
                            <NavLink style={activeLink} to="/signin">
                                Signin
                            </NavLink>
                        </li>
                        <li>
                            <NavLink style={activeLink} to="/signup">
                                Signup
                            </NavLink>
                        </li>
                    </>
                )}

                {currentUser && (
                    <>
                        <li>hello, {currentUser.displayName}</li>
                        <li>
                            <button className="btn" onClick={logoutHandler}>
                                {loading ? 'Loading' : 'Logout'}
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Signin from './pages/Signin/Signin';
import Signup from './pages/Signup/Signup';
import { auth } from './firebase/config';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './redux/authSlice';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const dispatch = useDispatch();
    const { currentUser, isAuthReady } = useSelector(state => state.auth);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            let currentUser = null;

            if (user) {
                currentUser = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName,
                    apiKey: user.apiKey,
                    accessToken: user.stsTokenManager.accessToken,
                    refreshToken: user.stsTokenManager.refreshToken,
                    expirationTime: user.stsTokenManager.expirationTime,
                };
            }

            dispatch(login(currentUser));

            unsub();
        });
    }, []);

    return (
        <div>
            {isAuthReady && (
                <>
                    <ToastContainer />
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<PrivateRoute />}>
                            <Route path="/" element={<Home />} />
                        </Route>

                        <Route
                            path="signin"
                            element={
                                currentUser ? (
                                    <Navigate to="/" replace />
                                ) : (
                                    <Signin />
                                )
                            }
                        />
                        <Route
                            path="signup"
                            element={
                                currentUser ? (
                                    <Navigate to="/" replace />
                                ) : (
                                    <Signup />
                                )
                            }
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </>
            )}
        </div>
    );
}

export default App;

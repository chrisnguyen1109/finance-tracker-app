import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute() {
    const currentUser = useSelector(state => state.auth.currentUser);

    return currentUser ? <Outlet /> : <Navigate to="/signin" replace />;
}

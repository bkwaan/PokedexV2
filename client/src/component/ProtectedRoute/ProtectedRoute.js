import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'
import { getUser, isLoggedIn } from '../../redux/Selectors/user';

// Component is used for redirectring users back to login if there is no user in redux store
const ProtectedRoute = (props) => {
    const location = useLocation();
    const authd = useSelector(isLoggedIn);
    const component = (!authd) ? <Navigate to='/login' state={{prev: location.pathname}}/> : props.child
    return (
        component
    );
}

export default ProtectedRoute;

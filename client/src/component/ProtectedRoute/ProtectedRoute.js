import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom'
import { getUser } from '../../redux/Selectors/user';

// Component is used for redirectring users back to login if there is no user in redux store
const ProtectedRoute = (props) => {
    const location = useLocation();
    const authd = useSelector(getUser);
    const component = (Object.keys(authd).length === 0) ? <Navigate to='/login' state={{prev: location.pathname}}/> : props.child
    return (
        component
    );
}

export default ProtectedRoute;

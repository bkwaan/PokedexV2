import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom'
import { getUser } from '../../redux/Selectors/user';

// Component is used for redirectring users back to login if there is no user in redux store
const ProtectedRoute = (props) => {
    const authd = useSelector(getUser);
    const component = (Object.keys(authd).length === 0) ? <Navigate to='/Login' /> : props.child
    console.log(authd)
    return (
        component
    );
}

export default ProtectedRoute;

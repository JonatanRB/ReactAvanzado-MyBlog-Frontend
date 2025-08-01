import { Navigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

const PrivateRoute = ({childern}) => {
    const {user} = useUser()
    return user ? childern : <Navigate to="/login" />
}

export default PrivateRoute
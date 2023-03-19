import { useAppContext } from '../context/appContext.mjs';
import { Navigate } from 'react-router-dom';
// import Loading from '../components/Loading';
const ProtectedRoute = ({ children }) => {
  const { user} = useAppContext();
  if (!user) {
    return <Navigate to='/landing' />;
  }
  return children;
};

export default ProtectedRoute;

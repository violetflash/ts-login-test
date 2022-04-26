import { useContext } from 'react';

// auth provider
import AuthContext from '../contexts/AuthContext';

const useAuth = () => useContext(AuthContext);

export default useAuth;

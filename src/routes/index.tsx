import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthRoutes from './AuthRoutes';

// ==============================|| ROUTING RENDER ||============================== //

const AppRoutes = () => {
    return useRoutes([...AuthRoutes, MainRoutes]);
};

export default AppRoutes;

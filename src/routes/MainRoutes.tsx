import { AuthGuard } from '../utils/routeGuard/AuthGuard';
import { Outlet } from 'react-router-dom';
import MainPage from '../views/MainPage';

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <Outlet />
        </AuthGuard>
    ),
    children: [
        {
            path: '/',
            element: <MainPage />
        }
    ]
};

export default MainRoutes;

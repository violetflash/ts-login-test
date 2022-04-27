import { AuthGuard } from '../utils/routeGuard/AuthGuard';
import { Outlet } from 'react-router-dom';
import Users from '../views/Users';

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
            element: <Users />
        }
    ]
};

export default MainRoutes;

import { AuthGuard } from '../utils/routeGuard/AuthGuard';
import MainLayout from '../layout/MainLayout';
import { UserList } from '../views/UserList';

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/users',
            element: <UserList />
        }
    ]
};

export default MainRoutes;

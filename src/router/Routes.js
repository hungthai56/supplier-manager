
import HomePage from "pages/home/HomePage";
import MenuContainer from 'shared/components/sidebar/SidebarContainer';
import DetailUserContainer from 'shared/containers/detail-user/DetailUserContainer';
import MainLayout from "shared/components/layout/MainLayout";
import { AdminGuard } from "./guards/AdminGuard";
import UpdateTable from "shared/containers/update-table/UpdateTable";

const Routes = [
    {
        layout: MainLayout,
        routes: [
            {
                id: 'UPDATE',
                guards: [AdminGuard],
                component: <UpdateTable />,
                fallback: () => {
                    return null;
                }
            },{
                id: 'LISTSUP',
                guards: [AdminGuard],
                component: <HomePage />,
                fallback: () => {
                    return null;
                }
            },{
                id: 'DETAIL',
                guards: [AdminGuard],
                component: <DetailUserContainer />,
                fallback: () => {
                    return null;
                }
            },{
                id: 'HOME',
                guards: [AdminGuard],
                component: <HomePage />,
                fallback: () => {
                    return null;
                }
            }
        ]
    },
];

export default Routes
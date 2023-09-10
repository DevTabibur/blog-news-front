import { useEffect } from 'react';
import { paramCase } from 'change-case';
// import { useParams, useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
// material
import { Container } from '@mui/material';
// redux
// import { useDispatch, useSelector } from '../../redux/store';
// import { getUserList } from '../../redux/slices/user';
// routes
import { PATH_DASHBOARD } from 'routes/paths';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import UserNewForm from 'components/_dashboard/user/UserNewForm';
import { useDispatch } from 'react-redux';

// ----------------------------------------------------------------------

export default function UserCreate() {
    const { themeStretch } = useSettings();
    // const dispatch = useDispatch();
    // const {pathname} = useRouter()
    // const { name } = useParams();
    // const { userList } = useSelector((state) => state.user);
    // const isEdit = pathname.includes('edit');
    // const currentUser = userList.find((user) => paramCase(user.name) === name);

    // useEffect(() => {
    //     dispatch(getUserList());
    // }, [dispatch]);

    return (
        <Page title="User: Create a new user | BoostingOn Agency">
            {/* <Container maxWidth={themeStretch ? false : 'lg'}>
                <HeaderBreadcrumbs
                    heading={!isEdit ? 'Create a new user' : 'Edit user'}
                    links={[
                        { name: 'Dashboard', href: PATH_DASHBOARD.root },
                        { name: 'User', href: PATH_DASHBOARD.user.root },
                        { name: !isEdit ? 'New user' : name }
                    ]}
                />

                <UserNewForm isEdit={isEdit} currentUser={currentUser} />
            </Container> */}
        </Page>
    );
}

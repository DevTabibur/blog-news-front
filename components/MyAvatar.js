// hooks
// import useAuth from '../hooks/useAuth';
//
import createAvatar from '@/utils/createAvatar';
import MAvatar from './@material-extend/MAvatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
    //   const { user } = useAuth();
    const user = {
        displayName: 'Tabibur DUMMY DATA'
    }

    return (
        <MAvatar
            src={user?.photoURL}
            alt={user?.displayName}
            color={user?.photoURL ? 'default' : createAvatar(user.displayName).color}
            {...other}
        >
            {createAvatar(user?.displayName).name}
        </MAvatar>
    );
}

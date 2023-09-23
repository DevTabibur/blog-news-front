
import { Button, Card, Checkbox, Container, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from "@mui/material";
import { sentenceCase } from 'change-case';
import Scrollbar from "@/components/Scrollbar";
import { UserListHead, UserMoreMenu } from "../user/list";
import SearchNotFound from "@/components/SearchNotFound";
import { useState } from "react";
import Label from "@/components/Label";


// ----------------------------------------------------------------------




const TABLE_HEAD = [
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'email', label: 'Email', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'permissions', label: 'Permissions', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' }
];


// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

//   function applySortFilter(array, comparator, query) {
//     const stabilizedThis = array.map((el, index) => [el, index]);
//     stabilizedThis.sort((a, b) => {
//       const order = comparator(a[0], b[0]);
//       if (order !== 0) return order;
//       return a[1] - b[1];
//     });
//     if (query) {
//       return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//     }
//     return stabilizedThis.map((el) => el[0]);
//   }


const UserListForm = () => {
    const theme = useTheme();
    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [selected, setSelected] = useState([]);
    const [orderBy, setOrderBy] = useState('name');
    const [filterName, setFilterName] = useState('');
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const userList = [
        {
            id: '1',
            name: 'tabi',
            email: 'tupu@gmail.com',
            role: 'user',
            status: 'active',
            permissions: ["settings", "Ad Placing"]
        },
        {
            id: '2',
            name: 'Kabi',
            email: 'kabi@gmail.com',
            role: 'user',
            status: 'inactive',
            permissions: ["settings", "Ad Placing"]
        },
        {
            id: '3',
            name: 'Habi',
            email: 'habi@gmail.com',
            role: 'user',
            status: 'active',
            permissions: ["settings", "Ad Placing"]
        },
    ]

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        console.log('handleSelectAllClick', event.target.checked);
        // if (event.target.checked) {
        //     const newSelecteds = userList.map((n) => n.name);
        //     setSelected(newSelecteds);
        //     return;
        // }
        // setSelected([]);
    };


    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - userList.length) : 0;

    // const filteredUsers = applySortFilter(userList, getComparator(order, orderBy), filterName);

    // const isUserNotFound = filteredUsers.length === 0;



    return (
        <>
            <Card>
                {/* <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} /> */}

                <Scrollbar>
                    <TableContainer sx={{ minWidth: 800 }}>
                        <Table>
                            <UserListHead
                                order={order}
                                orderBy={orderBy}
                                headLabel={TABLE_HEAD}
                                rowCount={userList.length}
                                numSelected={selected.length}
                                onRequestSort={handleRequestSort}
                                onSelectAllClick={handleSelectAllClick}
                            />
                            <TableBody>
                                {userList.map((row) => {
                                    const { id, name, email, role, status, permissions } = row;
                                    const isItemSelected = selected.indexOf(name) !== -1;

                                    return (
                                        <TableRow
                                            hover
                                            key={id}
                                            tabIndex={-1}
                                            role="checkbox"
                                            selected={isItemSelected}
                                            aria-checked={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox checked={isItemSelected} onChange={(event) => handleClick(event, name)} />
                                            </TableCell>
                                            <TableCell component="th" scope="row" padding="none">
                                                <Stack direction="row" alignItems="center" spacing={2}>
                                                    {/* <Avatar alt={name} src={avatarUrl} /> */}
                                                    <Typography variant="subtitle2" noWrap>
                                                        {name}
                                                    </Typography>
                                                </Stack>
                                            </TableCell>
                                            <TableCell align="left">{email}</TableCell>
                                            <TableCell align="left">{role}</TableCell>
                                            <TableCell align="left">{permissions}</TableCell>
                                            <TableCell align="left">
                                                <Label
                                                    variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                                    color={(status === 'inactive' && 'error') || 'success'}
                                                >
                                                    {sentenceCase(status)}
                                                </Label>
                                            </TableCell>

                                            <TableCell align="right">
                                                <UserMoreMenu onDelete={() => handleDeleteUser(id)} userName={name} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            {/* {isUserNotFound && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                                            <SearchNotFound searchQuery={filterName} />
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            )} */}
                        </Table>
                    </TableContainer>
                </Scrollbar>

                {/* <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={userList.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}
            </Card>
        </>
    )
}

export default UserListForm
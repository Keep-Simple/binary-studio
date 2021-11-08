import AddBox from '@material-ui/icons/AddBox';
import React, {forwardRef} from 'react';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import MaterialTable from 'material-table';
import {AppState} from "../../types/types";
import {connect, ConnectedProps} from "react-redux";
import {addUser, deleteUser, editUser} from "../../redux/users/actions";


const UserList = (props: UserListProps) => {

    const {add, del, edit, users, isLoading} = props;

        return (
            <MaterialTable
                isLoading={isLoading}
                columns={[
                    {
                        title: 'Username',
                        field: 'name',
                        validate: rowData => rowData.name === '' ? 'Name cannot be empty' : ''
                    },
                    {title: 'Avatar', field: 'avatar'},
                    {
                        title: 'Password',
                        field: 'password',
                        validate: rowData => rowData.password?.length < 3 ? 'Password must have at least 3 chars' : '',
                        editable: 'onAdd'
                    },
                ]}
                data={users}
                title="Users"
                editable={{
                    isEditHidden: rowData => rowData.name === 'admin',
                    isDeleteHidden: rowData => rowData.name === 'admin',
                    onRowUpdate: newData => Promise.resolve(edit(newData)),
                    onRowAdd: newData => Promise.resolve(add(newData)),
                    onRowDelete: oldData => Promise.resolve(del(oldData))
                }}
                icons={{
                    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref}/>),
                    Check: forwardRef((props, ref) => <Check {...props} ref={ref}/>),
                    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
                    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref}/>),
                    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
                    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref}/>),
                    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref}/>),
                    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref}/>),
                    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref}/>),
                    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref}/>),
                    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref}/>),
                    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref}/>),
                    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref}/>),
                    Search: forwardRef((props, ref) => <Search {...props} ref={ref}/>),
                    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref}/>),
                    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref}/>),
                    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref}/>)
                }}
            />
        );
}

const mapState = (state: AppState) => ({
    users: state.users,
    isLoading: state.isLoading
});

const mapDispatch = {
    add: addUser,
    edit: editUser,
    del: deleteUser
};

const connector = connect(mapState, mapDispatch);

type UserListProps = ConnectedProps<typeof connector>;

export default connector(UserList);


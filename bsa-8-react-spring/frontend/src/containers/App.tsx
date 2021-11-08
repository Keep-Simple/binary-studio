import React, {useEffect} from "react";
import {Link, Route, Switch, useHistory} from "react-router-dom"
import Chat from "./Chat";
import UserList from "../components/UserTable";
import {AppState, UserState} from "../types/types";
import {connect, ConnectedProps} from "react-redux";
import {Dimmer, Loader} from "semantic-ui-react";
import SignIn from "../components/LoginPage/login";
import SignUp from "../components/LoginPage/register";
import {getAuthToken, removeAuthToken} from "../redux/general/sagas";
import {loadData, setUser} from "../redux/general/actions";


const App = (props: AppProps) => {

    const {isAdmin, loading, loadData, setUser, user} = props;
    const history = useHistory();

    const handleLogOut = () => {
        removeAuthToken();
        setUser({} as UserState);
        history.push('/login');
    }

    useEffect(() => {
        const token = getAuthToken()

        if (token) {
            isAdmin ? history.push('/users') : history.push('/')
        } else {
            history.push('/login')
        }
    }, [isAdmin, history]);

    useEffect(() => { loadData() },[loadData])

    return (
        <>
            {loading &&
            <Dimmer active inverted>
              <Loader inverted>Loading</Loader>
            </Dimmer>}
            <div>
                {user.name &&
                <>
                  <h2>Navigation</h2>
                  <ul>
                      {isAdmin &&
                      <>
                        <li>
                          <Link to='/users'>To Users</Link>
                        </li>
                        <li>
                          <Link to='/'>Chat</Link>
                        </li>
                      </>
                      }
                    <li><Link to='/login' onClick={handleLogOut}>Logout</Link></li>
                  </ul>
                </>
                }
            </div>
            <Switch>
                <Route exact path='/login' component={SignIn}/>
                <Route exact path='/' component={Chat}/>
                {isAdmin && <Route exact path='/users' component={UserList}/>}
                <Route exact path='/signUp' component={SignUp}/>
            </Switch>
        </>
    );
}

const mapState = (state: AppState) => ({
    isAdmin: state.currentUser?.isAdmin,
    user: state.currentUser,
    loading: state.isLoading
});

const connector = connect(mapState, {loadData, setUser});

type AppProps = ConnectedProps<typeof connector>;

export default connector(App);

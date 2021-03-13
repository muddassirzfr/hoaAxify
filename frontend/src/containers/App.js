import React from 'react'
import { Route, Switch } from 'react-router-dom'
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";
import UserSignupPage from "../pages/UserSignupPage";
import * as apiCalls from '../apiCalls/apiCalls'
import Topbar from '../components/Topbar'
// pzssing apicalls methods to respective pages so that
// they can be used
// const actions = {
//     postLogin: apiCalls.login,
//     postSignUp: apiCalls.signup
// };
function App() {
    return (
        <div>
            <Topbar />
            <div className="container">
                <Switch>
                    {/* // prefix matching happens */}
                    <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={UserSignupPage} />
                    {/* // a dynamic route will always open userpage only */}
                    <Route path="/:username" component={UserPage} />

                </Switch>
            </div>
        </div>
    );
}

export default App;

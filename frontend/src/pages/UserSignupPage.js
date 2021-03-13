import React from 'react';
import Input from '../components/Input'
import { ButtonWithProgress } from '../components/ButtonWithProgress'
import { connect } from 'react-redux';
import * as authActions from '../redux/authActions'
import * as apiCalls from '../apiCalls/apiCalls'
export class UserSignupPage extends React.Component {
    state = {
        username: '',
        displayName: '',
        password: '',
        repPassword: '',
        pendingApiCall: false,
        errors: {},
        passwordRepeatConfirmed: true
    }
    onChangeUsername = (event) => {
        let errors = { ...this.state.errors }
        delete errors.username
        this.setState({ username: event.target.value, errors })
    }
    onChangeDisplayName = (event) => {
        let errors = { ...this.state.errors }
        delete errors.displayName
        this.setState({ displayName: event.target.value, errors })
    }

    onChangePassword = (event) => {
        const val = event.target.value;
        const confirm = this.state.repPassword === val;
        let errors = { ...this.state.errors }
        errors.repPassword = confirm ? '' : 'Does not match with repeated password'
        this.setState({ password: val, passwordRepeatConfirmed: confirm, errors: errors })
    }

    onChangeredPass = (event) => {
        const val = event.target.value;
        const confirm = this.state.password === val;
        let errors = { ...this.state.errors }
        errors.repPassword = confirm ? '' : 'Does not match with password'
        this.setState({ repPassword: val, passwordRepeatConfirmed: confirm, errors: errors })
    }

    onClickSignUp = () => {
        const user = {
            username: this.state.username,
            displayName: this.state.displayName,
            password: this.state.password,
            repPassword: this.state.repPassword
        };
        this.setState({ pendingApiCall: true });
        this.props.actions
            .postSignUp(user) // this is the redux dispatch fn configured using thunk
            .then((response) => { //only when the api call is complete
                this.setState({ pendingApiCall: false }, () => {
                    this.props.history.push('/')
                });
            }).catch((apiError) => {
                let errors = { ...this.state.errors };
                if (apiError.response.data && apiError.response.data.validationErrors) {// from spring boot model
                    errors = { ...apiError.response.data.validationErrors }// now the errors state has all the data from backend 
                    //bas ab sahi jagah daalna ha.
                }
                this.setState({ pendingApiCall: false, errors })
            });
    };

    render() {
        return (
            <div className='container'>
                <h1 className='text-center'>Sign Up</h1>
                <div className='col-12 mb-3'>
                    <Input
                        label="Username"
                        placeholder="Enter username"
                        onChange={this.onChangeUsername}
                        value={this.state.username}
                        hasError={this.state.errors.username && true}
                        error={this.state.errors.username}
                    />
                </div>
                <div className='col-12 mb-3'>
                    <Input // yeh sab reactive component hai jab bhi state change hoga ye sab bhi change hoga..
                        label="Display Name"
                        className='form-control'
                        placeholder="Enter display name"
                        onChange={this.onChangeDisplayName}
                        value={this.state.displayName}
                        hasError={this.state.errors.displayName && true}
                        error={this.state.errors.displayName}
                    />
                </div>
                <div className='col-12 mb-3'>
                    <Input
                        label="Password"
                        className='form-control'
                        placeholder="Enter password"
                        type="password"
                        onChange={this.onChangePassword}
                        value={this.state.password}
                        hasError={this.state.errors.password && true}
                        error={this.state.errors.password}
                    />
                </div>
                <div className='col-12 mb-3'>
                    <Input
                        label='Repeat Password'
                        className='form-control'
                        placeholder="Repeat password"
                        type="password"
                        onChange={this.onChangeredPass}
                        value={this.state.repPassword}
                        hasError={this.state.errors.repPassword && true}
                        error={this.state.errors.repPassword}
                    />
                </div>
                <div className='text-center' >
                    <ButtonWithProgress
                        onClick={this.onClickSignUp}
                        pendingApiCall={this.pendingApiCall}
                        disabled={this.state.pendingApiCall || !this.state.passwordRepeatConfirmed}
                        text="SignUp"
                    />
                </div>
            </div>

        );
    };
}
UserSignupPage.defaultProps = {
    actions: {
        postSignup: () =>
            new Promise((resolve, reject) => {
                resolve({});
            })
    },
    history: {
        push: () => { }
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: {
            postSignUp: (user) => dispatch(authActions.signupHandler(user))
        }
    }
}

export default connect(null, mapDispatchToProps)(UserSignupPage);
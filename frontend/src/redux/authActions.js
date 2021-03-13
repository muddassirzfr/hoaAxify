import * as apiCalls from '../apiCalls/apiCalls'

export const loginSuccess = (loginUserData) => {
    return {
        type: 'login-success',
        payload: loginUserData
    };
};

export const loginHandler = (credentials) => {
    return function (dispatch) { // thunk will provide dispatch obj to this fn and which will
        // then go to reducer
        return apiCalls.login(credentials).then((response) => {
            dispatch( // dispatch to the reducer
                loginSuccess({ // this fun is an action
                    ...response.data,
                    password: credentials.password
                })
            );
            return response;
        });
    };
};

export const signupHandler = (user) => {
    return function (dispatch) {
        return apiCalls.signup(user).then((response) => {
            return dispatch(loginHandler(user));
        })
    }
}


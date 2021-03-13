const initialState = {
    id: 0,
    username: '',
    displayName: '',
    image: '',
    password: '',
    isLoggedIn: false
}
// put in default is state is null
//single source of truth
// means one global state
export default function authReducer(state = initialState, action) {
    if (action.type === 'logout-success') {
        // logged out
        return { ...initialState };
    }
    else if (action.type === 'login-success') {
        // new states being returned
        return {
            // logged in
            ...action.payload,
            isLoggedIn: true
        };

    }
    return state; // both the params are from redux to
    // this reducer pure fn
}
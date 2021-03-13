import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { HashRouter } from 'react-router-dom'
import App from './containers/App'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
// dummy loggedIn for topbar simulation
// const loggedInState = {
//   id: 1,
//   username: 'user-text',
//   displayName: 'displayname-text',
//   image: 'img-text.png',
//   password: 'P4ssword',
//   isLoggedIn: true
// }

// ReactDOM.render(
//   <React.StrictMode>
//     {/* always invoke this component with */}
//     {/* <UserSignupPage actions={actions} /> */}
//     <LoginPage actions ={actions}/>
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    {/* the global redux state is pushed down the tree */}
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,

  document.getElementById('root')
)



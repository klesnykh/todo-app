import React from 'react';
import cookie from 'react-cookies';
import jwt_decode from 'jwt-decode';

export const LoginContext = React.createContext();

const testUsers = {
  Admininistrator: {
    password: 'admin',
    name: 'Administrator',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiQWRtaW5pc3RyYXRvciIsInJvbGUiOiJhZG1pbiIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJywncmVhZCcsJ3VwZGF0ZScsJ2RlbGV0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.pAZXAlTmC8fPELk2xHEaP1mUhR8egg9TH5rCyqZhZkQ'
  },
  Editor: {
    password: 'editor',
    name: 'Editor',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiRWRpdG9yIiwicm9sZSI6ImVkaXRvciIsImNhcGFiaWxpdGllcyI6IlsncmVhZCcsJ3VwZGF0ZSddIiwiaWF0IjoxNTE2MjM5MDIyfQ.3aDn3e2pf_J_1rZig8wj9RiT47Ae2Lw-AM-Nw4Tmy_s'
  },
  Writer: {
    password: 'writer',
    name: 'Writer',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiV3JpdGVyIiwicm9sZSI6IndyaXRlciIsImNhcGFiaWxpdGllcyI6IlsnY3JlYXRlJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.dmKh8m18mgQCCJp2xoh73HSOWprdwID32hZsXogLZ68'
  },
  User: {
    password: 'user',
    name: 'User',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiVXNlciIsInJvbGUiOiJ1c2VyIiwiY2FwYWJpbGl0aWVzIjoiWydyZWFkJ10iLCJpYXQiOjE1MTYyMzkwMjJ9.WXYvIKLdPz_Mm0XDYSOJo298ftuBqqjTzbRvCpxa9Go'
  },
};

function LoginProvider(props) {
  const initialState = {
    loggedIn: false,
    token: null,
    user: { capabilities: [] },
    error: null,
  };

  const authReducer = (state, action) => {
    switch(action.type) {
      case 'LOAD':
        return {
          ...state,
          token: action.payload,
        };
      case 'LOGIN':
        let { username, password } = action.payload;
        let {  token } = state;
        let auth = testUsers[username];
      
        if (auth && auth.password === password) {
          try {
            let validUser = jwt_decode(auth.token);
            return {
              ...state,
              user: validUser,
              token: token,
              loggedIn: true
            };
          } catch(e) {
            return {
              ...state, 
              error: e};
          }
        } else {
          return {
            ...state,
            error: {message: 'Invalid credentials'},
          };
        }
      case 'LOGOUT':
        return initialState;
      case 'AUTH_ERROR':
        return {
          ...state,
          error: action.payload,
        };
      default:
        return state;
    }
  };

  const can = (capability) => {
    return state?.user?.capabilities?.includes(capability);
  };

  const onLoad = (token) => {
    //decode the token
    let decoded = jwt_decode(token);
    let tokenUser = testUsers[decoded.name];
    //check if the token is still good
    if(tokenUser && tokenUser.token === token){
      dispatch({
        type: 'LOAD',
        payload: token
      });
    }
  };

  const login = (user, pass) => {
    dispatch({
      type:'LOGIN',
      payload: {username: user, password: pass},
    });
  };

  const logout = () => {
    dispatch({
      type:'LOGOUT',
      payload: null,
    });
  };

  const [state, dispatch] = React.useReducer(authReducer, initialState);
  //deconstruct state so that we don't have to refer to the entire state object in Context
  let {loggedIn, user, token, error} = state;

  React.useEffect(() => {
    const qs = new URLSearchParams(window.location.search);
    const cookieToken = cookie.load('auth');
    const token = qs.get('token') || cookieToken || null;
    onLoad(token);
  }, []);

  return (
    <LoginContext.Provider value={{loggedIn, user, token, error, can, login, logout}} >
      {props.children}
    </LoginContext.Provider>
  );
}

export default LoginProvider;
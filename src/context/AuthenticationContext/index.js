import React from "react";

const AuthenticationContext = React.createContext();

const initialState = {
  authenticate: false,
  user: null,
  isSpinnig: false,
  loginError: null,
};

function authenticationReducer(state, action) {
  switch (action.type) {
    case "LOGIN": {
      return { ...state, authenticate: false };
    }
    case "SPINNING_START": {
      return { ...state, isSpinnig: true };
    }
    case "LOGIN_SUCCESS": {
      return {
        ...state,
        isSpinnig: false,
        authenticate: true,
        user: action.payload,
      };
    }
    case "LOGIN_FAIL": {
      return {
        ...state,
        isSpinnig: false,
        user: null,
        authenticate: false,
        loginError: action.payload,
      };
    }
    case "LOGOUT": {
      return { ...state, ...initialState };
    }
    default: {
      throw new Error(`No such action: ${action.type}`);
    }
  }
}

function useAuthentication() {
  const context = React.useContext(AuthenticationContext);
  if (!context) {
    throw new Error(`useAuthentication fail`);
  }
  const [state, dispatch] = context;

  const spinningStart = () => dispatch({ type: "SPINNING_START" });
  const loginSuccess = (data) =>
    dispatch({ type: "LOGIN_SUCCESS", payload: data });
  const loginFail = (data) => dispatch({ type: "LOGIN_FAIL", payload: data });
  const logoutSuccess = () =>
    dispatch({ type: "LOGOUT", payload: { ...initialState } });

  const loginRequest = (data) => {
    const { email, password } = data;
    if (email === "mustafa.deryol@hotmail.com" && password === "12345") {
      // TODO: fix to call api
      spinningStart();
      loginSuccess({ name: "Mustafa DERYOL", email: email });
    } else {
      loginFail("email or password is not valid");
    }
  };

  const logoutRequest = () => {
    spinningStart();
    logoutSuccess();
  };

  return {
    authenticate: state.authenticate,
    user: state.user,
    loginErrorMessage: state.loginError,
    loginRequest,
    logoutRequest,
  };
}

function AuthenticationProvider(props) {
  const [state, dispatch] = React.useReducer(
    authenticationReducer,
    initialState
  );
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <AuthenticationContext.Provider value={value} {...props} />;
}

export { AuthenticationProvider, useAuthentication };

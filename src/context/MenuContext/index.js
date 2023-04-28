import React from "react";
import { Navigate } from "react-router";

import { menu } from "../../menu";

const MenuContext = React.createContext();

const initialState = {
  menus: [],
  isSpinnig: false,
};

function menuReducer(state, action) {
  switch (action.type) {
    case "INITIALIZE": {
      return { ...state, ...initialState };
    }
    case "SPINNING_START": {
      return { ...state, isSpinnig: true };
    }
    case "CALL_API_SUCCESS": {
      return {
        ...state,
        isSpinnig: false,
        menus: action.payload,
      };
    }
    default: {
      throw new Error(`No such action: ${action.type}`);
    }
  }
}

function useMenu() {
  const context = React.useContext(MenuContext);
  if (!context) {
    throw new Error(`useMenu fail`);
  }
  const [state, dispatch] = context;

  const spinningStart = () => dispatch({ type: "SPINNING_START" });
  const callApiSuccess = (data) =>
    dispatch({ type: "CALL_API_SUCCESS", payload: data });
  const initializerRequest = () => dispatch({ type: "INITIALIZE" });

  const callApiRequest = () => {
    // TODO: fix to call api
    console.log("Deneme");
    spinningStart();
    callApiSuccess(menu);
  };

  return {
    menus: state.menus,
    menuApiRequest: callApiRequest,
    initializerRequest: initializerRequest,
  };
}

function MenuProvider(props) {
  const [state, dispatch] = React.useReducer(menuReducer, initialState);
  const value = React.useMemo(() => [state, dispatch], [state]);
  return <MenuContext.Provider value={value} {...props} />;
}

export { MenuProvider, useMenu };

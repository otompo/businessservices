import { useReducer, createContext, useEffect } from "react";
import { useRouter } from "next/router";

// initial state
const initialState = {
  user: null,
};

// create context
const AuthContext = createContext();

// root reducer
const rootReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "UPDATE_SUCCESS":
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

// context provider
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  useEffect(() => {
    dispatch({
      type: "LOGIN",
      payload: JSON.parse(window.localStorage.getItem("user")),
    });

    // dispatch({
    //   type: 'SET_TOKEN_AND_USER',
    //   payload: {
    //     token: data.token,
    //     user: JSON.parse(window.localStorage.getItem("user"))
    //   }
    // });
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

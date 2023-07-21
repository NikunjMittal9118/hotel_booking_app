import { createContext, useEffect, useReducer } from "react";

const initialState = {
    user: JSON.parse(localStorage.getItem("user")) || null,
    loading: false,
    error: null
}

const AuthContext = createContext(initialState)

const AuthReducer = (state, action) => {
    switch(action.type){
        case "AUTH_LOGIN_Start":
            return {
                user: null,
                loading: true,
                error: null
            };
        case "AUTH_LOGIN_Success":
            return {
                user: action.payload,
                loading: false,
                error: null
            };
        case "AUTH_LOGIN_Failed":
            return {
                user: null,
                loading: false,
                error: action.payload
            };
        case "AUTH_LOGOUT":
            return {
                user: null,
                loading: false,
                error: null
            };
        default:
            return state;
    }       
}



const AuthContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(AuthReducer, initialState)
    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(state.user))
    } , [state.user])
    return (
        <AuthContext.Provider 
            value={{user: state.user, loading: state.loading, error: state.error, dispatch}}
        >
          {children}
        </AuthContext.Provider>
    )
}

export {AuthContextProvider, AuthContext}
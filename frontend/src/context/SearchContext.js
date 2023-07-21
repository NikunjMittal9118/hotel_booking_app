import { createContext, useReducer } from "react";

const initialState = {
    city: undefined,
    date: [],
    options: {
        adullt: 0,
        children: 0,
        room: 0,
    }
}

const SearchContext = createContext(initialState)

const SearchReducer = (state, action) => {
    switch(action.type){
        case "NEW_SEARCH":
            console.log(`Your action is : ${action}, ${action.type}, ${action.payload}`)
            return action.payload;
        case "RESET":
            return initialState;
        default:
            return state;
    }       
}

const SearchContextProvider = ({children}) =>{
    const [state, dispatch] = useReducer(SearchReducer, initialState)
    return (
        <SearchContext.Provider 
            value={{city: state.city, date: state.date, options: state.options, dispatch,}}
        >
          {children}
        </SearchContext.Provider>
    )
}

export {SearchContextProvider, SearchContext}
import React,{createContext,useReducer,useEffect} from 'react';
import AppReducer from './AppReducer';
const initialState={
    expenses: JSON.parse(localStorage.getItem('expenses')) || []
}
//context
export const GlobalContext = createContext(initialState);
//provider
export const GlobalProvider=({children}) => {
    const[state,dispatch]= useReducer(AppReducer,initialState);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(state.expenses));
    }, [state.expenses]);

    //actions
    function deleteExpense(id){
        dispatch({
            type:'DELETE_EXPENSE',
            payload:id
        });
    }

    function addExpense(expense){
        dispatch({
            type:'ADD_EXPENSE',
            payload: expense
        });
    }

    
    return (<GlobalContext.Provider value={
        {
        expenses:state.expenses,
        deleteExpense,
        addExpense
    }
    }>
        {children}
    </GlobalContext.Provider>);
}
import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const ExpensesContext = React.createContext();

export const ExpensesProvider = (props) => {
  const apiUrl = "/api/Expenses";
  const [expenses, setExpenses] = useState([]);
 
  const { getToken } = useContext(UserProfileContext);

  

  const addExpenses = (Expenses) => {
    return getToken().then((token) => 
    fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Expenses)
    })
    .then((res) => res.json()));
  }

  const getExpensesById = (id) => {
    return getToken().then((token) =>
    fetch(`/api/Expenses/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json()))
  }  

  const updateExpenses = (Expenses) => {
    return getToken().then((token) => 
    fetch(`/api/Expenses/${Expenses.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(Expenses)
    }))
  
  }

  const getUserExpenses = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetAllExpensesByUserId/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json()))
        .then(setExpenses);
  }

  const deleteExpenses = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`
        },
      })
    );
  };

  return (
    <ExpensesContext.Provider value={{ expenses, setExpenses, getUserExpenses, addExpenses, getExpensesById, updateExpenses, deleteExpenses }}>
      {props.children}
    </ExpensesContext.Provider>
  )
}

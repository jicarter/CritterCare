import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const FoodContext = React.createContext();

export const FoodProvider = (props) => {
  const apiUrl = "/api/Food";
  const [Food, setFood] = useState([]);
 
  const { getToken } = useContext(UserProfileContext);

  

  const addFood = (Food) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Food),
    })
    .then((res) => res.json()));
  }

  const getFoodById = (id) => {
    return getToken().then((token) =>
    fetch(`/api/Food/GetFoodById/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json()))
      .then(setFood);
  }  

  const updateFood = (Food) => {
    return getToken().then((token) => 
    fetch(`/api/Food/${Food.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Food)
    }))
  
  }

  const getUserFood = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetAllFoodByUserId${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json()))
        .then(setFood);
  }

  const deleteFood = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    );
  };

  return (
    <FoodContext.Provider value={{ Food, setFood, getUserFood, addFood, getFoodById, updateFood, deleteFood }}>
      {props.children}
    </FoodContext.Provider>
  )
}

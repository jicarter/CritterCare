import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const FoodContext = React.createContext();

export const FoodProvider = (props) => {
  const apiUrl = "/api/Food";
  const [Foods, setFood] = useState([]);

  const { getToken } = useContext(UserProfileContext);
  const userProfile = sessionStorage.getItem("userProfile");
  var currentUser = JSON.parse(userProfile)


  const addFood = (Foods) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Foods),
      })
        .then((res) => res.json()));
  }

  const getFoodById = (id) => {
    return getToken().then((token) =>
      fetch(`/api/Food/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json()))

      .then(console.log(Foods))
  }

  const updateFood = (Foods) => {
    return getToken().then((token) =>
      fetch(`/api/Food/${Foods.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Foods)
      }))

  }

  const getUserFood = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetAllFoodByUserId/${currentUser.id}`, {
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
    <FoodContext.Provider value={{ Foods, setFood, getUserFood, addFood, getFoodById, updateFood, deleteFood }}>
      {props.children}
    </FoodContext.Provider>
  )
}

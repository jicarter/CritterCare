import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const CritterFoodContext = React.createContext();

export const CritterFoodProvider = (props) => {
  const apiUrl = "/api/CritterFood";
  const [CritterFood, setCritterFood] = useState([]);
 
  const { getToken } = useContext(UserProfileContext);

  

  const addCritterFood = (CritterFood) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CritterFood),
    })
    .then((res) => res.json()));
  }

  const getCritterFoodById = (id) => {
    return getToken().then((token) =>
    fetch(`/api/CritterFood/GetFoodByCritterId/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json()))
      .then(setCritterFood);
  }  

  const deleteCritterFood = (id) => {
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
    <CritterFoodContext.Provider value={{ CritterFood, setCritterFood, addCritterFood, getCritterFoodById, deleteCritterFood }}>
      {props.children}
    </CritterFoodContext.Provider>
  )
}

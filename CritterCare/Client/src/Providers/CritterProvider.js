import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const CritterContext = React.createContext();
const userProfile = sessionStorage.getItem("userProfile");
  var currentUser = JSON.parse(userProfile)
export const CritterProvider = (props) => {
  const apiUrl = "/api/Critter";
  const [Critter, setCritter] = useState([]);
 
  const { getToken } = useContext(UserProfileContext);

  

  const addCritter = (Critter) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Critter),
    })
    .then((res) => res.json()));
  }

  const getCritterById = (id) => {
    return getToken().then((token) =>
    fetch(`/api/Critter/GetCritterById/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json()))
      .then(setCritter);
  }  

  const updateCritter = (Critter) => {
    return getToken().then((token) => 
    fetch(`/api/Critter/${Critter.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Critter)
    }))
  
  }

  const getUserCritter = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetAllUsersCritters/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json()))
        .then(setCritter)
        .then(console.log(Critter));
  }

  const deleteCritter = (id) => {
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
    <CritterContext.Provider value={{ Critter, setCritter, getUserCritter, addCritter, getCritterById, updateCritter, deleteCritter }}>
      {props.children}
    </CritterContext.Provider>
  )
}

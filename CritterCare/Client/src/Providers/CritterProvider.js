import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const CritterContext = React.createContext();
const userProfile = sessionStorage.getItem("userProfile");
var currentUser = JSON.parse(userProfile)
export const CritterProvider = (props) => {
  const apiUrl = "/api/Critter";
  const [Critters, setCritter] = useState([]);

  const { getToken } = useContext(UserProfileContext);



  const addCritter = (critter) => {
    return getToken().then((token) =>
      fetch(apiUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(critter)
      })
        
    );
  }

  const getCritterById = (id) => {
    return getToken().then((token) =>
      fetch(`/api/Critter/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json()))

  }

  const updateCritter = (critter) => {
    return getToken().then((token) =>
      fetch(`/api/Critter/${critter.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(critter)
      }))

  }

  const getUserCritter = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetAllUsersCritters/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json()))
        //.then(r => setCritter(r)) //why does setCritters work and not have to write it like this
        .then(console.log(Critters))

  }

  const deleteCritter = (id) => {
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
    <CritterContext.Provider value={{ Critters, setCritter, getUserCritter, addCritter, getCritterById, updateCritter, deleteCritter }}>
      {props.children}
    </CritterContext.Provider>
  )
}

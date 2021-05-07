import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const CritterMedsContext = React.createContext();

export const CritterMedsProvider = (props) => {
  const apiUrl = "/api/CritterMeds";
  const [CritterMeds, setCritterMeds] = useState([]);
 
  const { getToken } = useContext(UserProfileContext);

  

  const addCritterMeds = (CritterMeds) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CritterMeds),
    })
    .then((res) => res.json()));
  }

  const getCritterMedsById = (id) => {
    return getToken().then((token) =>
    fetch(`/api/CritterMeds/GetMedsByCritterId/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json()))
      .then(setCritterMeds);
  }  

  const deleteCritterMeds = (id) => {
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
    <CritterMedsContext.Provider value={{ CritterMeds, setCritterMeds, addCritterMeds, getCritterMedsById, deleteCritterMeds }}>
      {props.children}
    </CritterMedsContext.Provider>
  )
}

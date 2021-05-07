import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const MedicineContext = React.createContext();

export const MedicineProvider = (props) => {
  const apiUrl = "/api/Medicine";
  const [Medicine, setMedicine] = useState([]);
 
  const { getToken } = useContext(UserProfileContext);

  

  const addMedicine = (Medicine) => {
    return getToken().then((token) => 
    fetch(`${apiUrl}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Medicine),
    })
    .then((res) => res.json()));
  }

  const getMedicineById = (id) => {
    return getToken().then((token) =>
    fetch(`/api/Medicine/GetMedicineById/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
      .then((res) => res.json()))
      .then(setMedicine);
  }  

  const updateMedicine = (Medicine) => {
    return getToken().then((token) => 
    fetch(`/api/Medicine/${Medicine.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Medicine)
    }))
  
  }

  const getUserMeds = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetAllMedicinesByUserId/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
        .then((res) => res.json()))
        .then(setMedicine);
  }

  const deleteMedicine = (id) => {
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
    <MedicineContext.Provider value={{ Medicine, setMedicine, getUserMeds, addMedicine, getMedicineById, updateMedicine, deleteMedicine }}>
      {props.children}
    </MedicineContext.Provider>
  )
}

import React, { useState, useContext } from "react";
import { UserProfileContext } from './UserProfileProvider';

export const MedicineContext = React.createContext();

export const MedicineProvider = (props) => {
  const apiUrl = "/api/Medicine";
  const [Medicines, setMedicine] = useState([]);

  const { getToken } = useContext(UserProfileContext);
  const userProfile = sessionStorage.getItem("userProfile");
  var currentUser = JSON.parse(userProfile)


  const addMedicine = (Medicines) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Medicines)
      })
        .then((res) => res.json()));
  }

  const getMedicineById = (id) => {
    return getToken().then((token) =>
      fetch(`/api/Medicine/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => res.json()))
  }

  const updateMedicine = (Medicines) => {
    return getToken().then((token) =>
      fetch(`/api/Medicine/${Medicines.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Medicines)
      }))

  }

  const getUserMeds = (id) => {
    return getToken().then((token) =>
      fetch(`${apiUrl}/GetAllMedicinesByUserId/${currentUser.id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`
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
          Authorization: `Bearer ${token}`
        },
      })
    );
  };

  return (
    <MedicineContext.Provider value={{ Medicines, setMedicine, getUserMeds, addMedicine, getMedicineById, updateMedicine, deleteMedicine }}>
      {props.children}
    </MedicineContext.Provider>
  )
}

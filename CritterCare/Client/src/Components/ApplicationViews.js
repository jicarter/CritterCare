import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Welcome from "./Welcome";
import { MedicineList } from "./Medicine/MedicineList";
import { FoodList } from "./Food/FoodList";
import { CritterList } from "./Critter/CritterList";
import { ExpensesList } from "./Expenses/ExpensesList";
import { UserProfile } from "./User/UserProfile";
import { CritterEdit } from "./Critter/CritterEdit";
import { CritterForm } from "./Critter/CritterForm";
import { FoodEdit } from "./Food/FoodEdit";
import { FoodForm } from "./Food/FoodForm";
import { MedicineEdit } from "./Medicine/MedicineEdit";
import { MedicineForm } from "./Medicine/MedicineForm";
import { ExpensesEdit } from "./Expenses/ExpensesEdit";
import { ExpensesForm } from "./Expenses/ExpensesForm";



export default function ApplicationViews() {
    const { isLoggedIn } = useContext(UserProfileContext);

    return (
        <main>
            <Switch>
                <Route path="/" exact>
                    {isLoggedIn ? <Welcome /> : <Redirect to="/login" />}
                </Route>

                <Route path="/login">
                    <Login />
                </Route>

                <Route path="/register">
                    <Register />
                </Route>

                <Route path="/Medicine/:id(\d+)" exact>
                    <MedicineList />
                </Route>
                <Route path="/Food/:id(\d+)" exact>
                    <FoodList />
                </Route>
                <Route path="/Critter/:id(\d+)" exact>
                    <CritterList />
                </Route>
                <Route path="/Expenses/:id(\d+)" exact>
                    <ExpensesList />
                </Route>
                <Route path="/UserProfile/:id(\d+)" exact>
                    <UserProfile />
                </Route>
                <Route path={`/Critter/edit/:id`}>
                    <CritterEdit />
                </Route>
                <Route path={`/Food/edit/:id`}>
                    <FoodEdit />
                </Route>
                <Route path={`/Medicine/edit/:id`}>
                    <MedicineEdit />
                </Route>
                <Route path={`/Expenses/edit/:id`}>
                    <ExpensesEdit />
                </Route>
                <Route path={`/critter/create`}>
                    <CritterForm />
                </Route>
                <Route path={`/Food/create`}>
                    <FoodForm />
                </Route>
                <Route path={`/Medicine/create`}>
                    <MedicineForm />
                </Route>
                <Route path={`/Expenses/create`}>
                    <ExpensesForm />
                </Route>
            </Switch>
        </main>
    );
};


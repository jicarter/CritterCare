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
            </Switch>
        </main>
    );
};


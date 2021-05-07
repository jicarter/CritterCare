import React, { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { UserProfileContext } from "../Providers/UserProfileProvider";
import Login from "./Login";
import Register from "./Register";
import Welcome from "./Welcome";
import { MedicineList } from "./Medicine/MedicineList";

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

                <Route path="/medicine/:id(\d+)" exact>
                    <MedicineList />
                </Route>
            </Switch>
        </main>
    );
};


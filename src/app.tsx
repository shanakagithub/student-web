

import { AuthProvider, useAuthContext } from "@asgardeo/auth-react";
import React, { FunctionComponent, ReactElement } from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./app.css";
import { default as authConfig } from "./config.json";
import { HomePage, NotFoundPage } from "./pages";
import MainNav from "./components/main-nav";

const AppContent: FunctionComponent = (): ReactElement => {
    const { error } = useAuthContext();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </Router>
    );
    
};

const App = () => (
    <><MainNav />
    <AuthProvider config={authConfig}>
        <AppContent />
    </AuthProvider></>
);

render((<App />), document.getElementById("root"));

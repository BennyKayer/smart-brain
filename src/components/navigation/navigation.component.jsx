import React from "react";
// Styles
import "./navigation.styles.scss";

const Navigation = ({ onRouteChange, isSignedIn }) =>
    isSignedIn ? (
        <nav className="navigation">
            <p
                className="f3 link dim black underline pa3 pointer"
                onClick={() => onRouteChange("signout")}
            >
                Sign Out
            </p>
        </nav>
    ) : (
        <div>
            <nav className="navigation">
                <p
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => onRouteChange("signin")}
                >
                    Sign In
                </p>
                <p
                    className="f3 link dim black underline pa3 pointer"
                    onClick={() => onRouteChange("register")}
                >
                    Register
                </p>
            </nav>
        </div>
    );

export default Navigation;

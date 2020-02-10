import React from "react";
import Tilt from "react-tilt";
import { ReactComponent as Brain } from "../../icons/brain.svg";
import "./logo.styles.scss";

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt className="Tilt br2 shadow-2" options={{ max: 55 }}>
                <div className="Tilt-inner pa3" width="200" height="200">
                    <Brain width="200" height="200" />
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;

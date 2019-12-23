import React from "react";
import Tilt from "react-tilt";
import { ReactComponent as Brain } from "../../icons/brain.svg";
import "./logo.styles.scss";

const Logo = () => {
    return (
        <div className="ma4 mt0">
            <Tilt
                className="Tilt br2 shadow-2"
                options={{ max: 55 }}
                style={{ height: 150, width: 150 }}
            >
                <div className="Tilt-inner pa3">
                    <Brain />
                </div>
            </Tilt>
        </div>
    );
};

export default Logo;

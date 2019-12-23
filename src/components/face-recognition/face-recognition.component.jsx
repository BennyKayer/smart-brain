import React from "react";
import "./face-recognition.styles.scss";

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img
                    id="inputimage"
                    alt=""
                    src={imageUrl}
                    width="500px"
                    height="auto"
                />
                <div
                    className="bounding-box"
                    style={{
                        top: box.topRow,
                        bottom: box.bottomRow,
                        left: box.leftCol,
                        right: box.rightCol
                    }}
                />
            </div>
        </div>
    );
};

export default FaceRecognition;

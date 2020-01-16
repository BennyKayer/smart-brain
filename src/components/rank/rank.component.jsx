import React from "react";

const Rank = ({ name, entries }) => {
    return (
        <div className="center header">
            <div className="black f3">
                {name} your entry count is {entries}
            </div>
        </div>
    );
};

export default Rank;

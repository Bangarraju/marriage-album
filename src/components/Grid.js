import { useState } from "react";
import Box from "./Box";
export default function Grid() {

    const [reset, setReset] = useState(false);

    const rows = 6;
    const cols = 6;

    const cells = [];

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            cells.push(<Box />);
        }
    }
    
    const resetClick = () => {
        setReset(!reset);
    }

    return (
        <div>
            <button onClick={resetClick}>reset</button>
            {"resetValue :: " + reset}
            <div className="Grid">
                {cells}
            </div>
        </div>
    );
}

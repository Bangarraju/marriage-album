import React, { useState } from "react";

export default function Box() {

  const [color, setColor] = useState("gray");

  const switchColor = () => {
    if (color === "gray") setColor("blue");
    else setColor("gray");
  };

  return (
    <div
      className="box"
      style={{ backgroundColor: color }}
      onClick={() => switchColor()}
    ></div>
  );
}

import React from "react";
// import SidLogo from "../assest/SKLogo.png"
import SidLogo from "../assest/SidLogo.png"


const Logo = ({ w, h }) => {
  // Assuming SidLogo.png is located in frontend/src/asset/ folder
  return (
    <div>
      <img
        src={SidLogo}
        alt="Logo"
        width={w}
        height={h}
      />
    </div>
  );
};

export default Logo;

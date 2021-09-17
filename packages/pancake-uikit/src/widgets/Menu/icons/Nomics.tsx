import React from "react";
import Svg from "../../../components/Svg/Svg";
import { SvgProps } from "../../../components/Svg/types";

const Icon: React.FC<SvgProps> = (props) => {
  return (
    <Svg viewBox="0 0 39 39" {...props} >
      <path d="M30,.1a8.54,8.54,0,0,0-6.2,2.6l-6,6A8.85,8.85,0,0,0,.1,9V30a8.75,8.75,0,0,0,8.8,8.8,8.94,8.94,0,0,0,6.3-2.6l6-6a8.85,8.85,0,0,0,17.7-.3V9A8.92,8.92,0,0,0,30,.1ZM19.6,28.3a8.85,8.85,0,1,1,8.8-8.9h0A8.71,8.71,0,0,1,19.6,28.3Z"/>
    </Svg>
  );
};

export default Icon;

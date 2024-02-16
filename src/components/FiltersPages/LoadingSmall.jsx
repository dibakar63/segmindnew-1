import React from "react";
import "./LoadingSmall.css";
const LoadingSmall = ({ loading }) => {
  if (!loading) return <></>;
  return (
    <div className="custom-loader-container">
      <span className="loader"></span>
    </div>
  );
};

export default LoadingSmall;

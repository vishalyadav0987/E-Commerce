import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import "./NotFound.css";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon style={{color:"#240750"}}/>

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
import React, { useState } from "react";
import "./SideBar.css";
import { Link, useLocation } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";
import { MdReviews } from "react-icons/md";

const SideBar = ({searchReviewOpen,clickHandler}) => {
  const location = useLocation()
  return (
    <div className="sidebar">
      <Link to="/">
        <img src={"https://clipground.com/images/ecommerce-logo-png-19.png"}
          alt="Ecommerce" style={{ width: "180px", padding: "48px 16px 32px 16px" }} />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <Link>
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon />}
          defaultExpandIcon={<ImportExportIcon />}
        >
          <TreeItem nodeId="1" label="Products">
            <Link to="/admin/products">
              <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
            </Link>

            <Link to="/admin/product">
              <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon />
          Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon />
          Reviews
        </p>
      </Link>
      {
        location.pathname === '/admin/reviews'
        ? <div onClick={clickHandler}
        style={{
          textDecoration: "none",
          font: "200 1.5rem Roboto",
          padding: "2rem",
          transition: "all 0.5s",
          color: "white",
          cursor:"pointer"
        }}>
        <p
          style={{
            display: "flex",
            alignItems: "center"
          }}>
          <MdReviews  style={{
            marginRight:"5px"
          }}/>
          Search Review by Id
        </p>
      </div>
      :""
      }
    </div>
  );
};

export default SideBar;
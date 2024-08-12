import React from "react";
import "./SideBar.css";
import { Link, useLocation } from "react-router-dom";
import { TreeView, TreeItem } from '@mui/x-tree-view';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { MdReviews } from "react-icons/md";

const SideBar = ({ searchReviewOpen, clickHandler }) => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <Link to="/">
        <img 
          src="https://clipground.com/images/ecommerce-logo-png-19.png"
          alt="Ecommerce"
          style={{ width: "180px", padding: "48px 16px 32px 16px" }}
        />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon /> Dashboard
        </p>
      </Link>
      <TreeView
        defaultCollapseIcon={<ExpandMoreIcon />}
        defaultExpandIcon={<ImportExportIcon />}
      >
        <TreeItem nodeId="1" label="Products">
          <TreeItem nodeId="2" label="All" icon={<PostAddIcon />} />
          <TreeItem nodeId="3" label="Create" icon={<AddIcon />} />
        </TreeItem>
      </TreeView>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon /> Orders
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon /> Users
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon /> Reviews
        </p>
      </Link>
      {location.pathname === '/admin/reviews' && (
        <div 
          onClick={clickHandler}
          style={{
            textDecoration: "none",
            font: "200 1.5rem Roboto",
            padding: "2rem",
            transition: "all 0.5s",
            color: "white",
            cursor: "pointer"
          }}
        >
          <p style={{ display: "flex", alignItems: "center" }}>
            <MdReviews style={{ marginRight: "5px" }} />
            Search Review by Id
          </p>
        </div>
      )}
    </div>
  );
};

export default SideBar;

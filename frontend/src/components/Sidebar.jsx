import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faChartLine, faList } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  return (
    <div>
      <aside className="menu pl-2 has-shadow">
        <ul className="menu-list">
          <li>
            <NavLink to={"/dashboard"}>
              <FontAwesomeIcon icon={faHome} className="pr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/transactions"}>
              <FontAwesomeIcon icon={faChartLine} className="pr-2" />
              Fund Transfer
            </NavLink>
          </li>
        </ul>
        <p className="menu-label">Transaction List</p>
        <ul className="menu-list">
          <li>
            <NavLink to={"/transfer-list"}>
              <FontAwesomeIcon icon={faList} className="pr-2" />
              Transfer List
            </NavLink>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default Sidebar;

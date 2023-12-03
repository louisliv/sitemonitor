import React from "react";

import { Link, useNavigate } from "react-router-dom";

import { Nav, Navbar } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faDesktop, faCog, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

import { AuthContext } from "../context/auth";
import api from "../utils/api";

function SiteNavbar() {
  const { logout, isLoggedIn } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/auth/logout");
      logout();
      navigate("/sitemonitor/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  }

  return (
    <div className="sidebar-container">
      <Navbar className="sidebar" >
        <Navbar.Collapse>
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to="/sitemonitor">
                <FontAwesomeIcon icon={faHome} />
              </Nav.Link>
            </Nav.Item>
            {isLoggedIn && (
              <>  
                <Nav.Item>
                  <Nav.Link as={Link} to="/sitemonitor/system-info">
                    <FontAwesomeIcon icon={faDesktop} />
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/sitemonitor/settings">
                    <FontAwesomeIcon icon={faCog} />
                  </Nav.Link>
                </Nav.Item>
                <div className="fill-bar"></div>
                <Nav.Item>
                  <Nav.Link onClick={handleLogout} aria-label="Logout">
                    <FontAwesomeIcon icon={faRightFromBracket} />
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default SiteNavbar;

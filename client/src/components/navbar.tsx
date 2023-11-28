import React from "react";

import { Link } from "react-router-dom";

import { Nav, Navbar,  } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faDesktop } from "@fortawesome/free-solid-svg-icons";

function SiteNavbar() {
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
            <Nav.Item>
              <Nav.Link as={Link} to="/sitemonitor/system-info">
                <FontAwesomeIcon icon={faDesktop} />
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default SiteNavbar;

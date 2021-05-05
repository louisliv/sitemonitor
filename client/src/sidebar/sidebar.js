import React from 'react';

import { Navbar, Nav, NavItem, Button } from 'reactstrap';
import { UISref, useIsActive } from '@uirouter/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartArea, faCog } from '@fortawesome/free-solid-svg-icons';

import './sidebar.css';

const Sidebar = () => {
    const homeIsActive = useIsActive("home",);
    const settingsIsActive = useIsActive("settings");

    return (
        <Navbar className="side-bar">
            <Nav>
                <UISref to="home" className={homeIsActive ? 'active': ''}>
                    <NavItem>
                        <Button outline={false}>
                            <FontAwesomeIcon icon={faChartArea} size="lg"/>
                        </Button>
                    </NavItem>
                </UISref>
                <UISref to="settings" className={settingsIsActive ? 'active': ''}>
                    <NavItem>
                        <Button outline={false}>
                            <FontAwesomeIcon icon={faCog} size="lg"/>
                        </Button>
                    </NavItem>
                </UISref>
            </Nav>
        </Navbar>
    )
}

export default Sidebar;
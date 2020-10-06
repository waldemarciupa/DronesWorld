import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../user-context';

const TopNav = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('user_id');
    }

    return isLoggedIn ? (
        <div>
            <Navbar color="faded" light>
                <NavbarToggler onClick={toggleNavbar} className="mr-2" />
                <Link to="/login" onClick={handleLogout}>Logout</Link>
                <Collapse isOpen={!collapsed} navbar>
                    <Nav navbar>
                        <NavItem>
                            <Link to="/events">Events</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/">Dashboard</Link>
                        </NavItem>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    ) : ""
}

export default TopNav;
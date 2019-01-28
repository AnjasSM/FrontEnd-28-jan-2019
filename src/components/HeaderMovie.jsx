import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

class HeaderMovie extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }
    render() {
        return (
            <div>
                <Navbar color="light" light expand="md">
                <NavbarBrand href="/">{this.props.navBrand}</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <Link to="/managemovie"><NavLink>Manage Movies</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/managecategory"><NavLink>Manage Catagories</NavLink></Link>
                            </NavItem>
                            <NavItem>
                                <Link to="/connectmovcat"><NavLink>Connect Movies and Category</NavLink></Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
        )
    }
}

export default HeaderMovie;
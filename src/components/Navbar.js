import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Nav = styled.nav`
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: stretch;
    background-color: #333;
    justify-content: space-evenly;
    a {
        text-decoration: none;
        color: white;
        padding: 12px 16px;
        &:hover{
            color: lightblue;
        }
    }
`;

export default class Navbar extends Component {
    render() {
        return (
            <Nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/matches">Matches</NavLink>
                <NavLink to="/teams">Teams</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </Nav>
        );
    }
}
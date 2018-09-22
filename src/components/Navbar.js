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
        width: 100%;
        cursor: pointer;
        text-align: center;
        color: white;
        padding: 12px 16px;
        border-bottom: 0.5rem solid #666;
        transition-duration: 0.4s;
        &:hover{
            color: #333;
        }
        &:nth-child(3n + 1){
            border-bottom-color: #f49712;
          }
          &:nth-child(3n){
            border-bottom-color: #f7d117;
          }
          &:nth-child(3n + 2){
            border-bottom-color: #a6d6c9;
          }
          &:nth-child(3n + 1):hover {
            background-color: #f49712;
          }

          &:nth-child(3n):hover {
            background-color: #f7d117;
          }

          &:nth-child(3n + 2):hover {
            background-color: #a6d6c9;
          }
    }
    margin-bottom: 1vmin;
    @media (max-width: 768px){
        flex-wrap: wrap;
    }
`;

export default class Navbar extends Component {
    render() {
        return (
            <Nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/rules">Rules</NavLink>
                <NavLink to="/matches">Matches</NavLink>
                <NavLink to="/statistics">Statistics</NavLink>
                <NavLink to="/teams">Teams</NavLink>
                <NavLink to="/admin">Admin</NavLink>
            </Nav>
        );
    }
}

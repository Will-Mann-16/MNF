import React, { Component } from 'react';
import styled from 'styled-components';

const FooterComponent = styled.div`
        background-color: #f1f1f1;
        width: 100%;
        font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
        font-size: 0.75rem;
        padding: 1rem;
        color: #aaa;
        position: fixed;
        bottom: 0;
        max-height: 50px;
        overflow: auto;
`

export default class Footer extends Component {
    state = {  }
    render() {
        return (
            <FooterComponent>
                Designed & Maintained by WellyCompSci. Monday Night Football is a student tournament with no house points ran by the students for the students. This web application was designed for educational purposes only. Teams, Matches, and Statistics are constantly reviewed to avoid errors, but we cannot warrant full correctness of all content. While using this site, you agree to have read and accepted our terms of use, cookie and privacy policy. Built by Mann Power.
            </FooterComponent>
        );
    }
}
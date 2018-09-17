import React from 'react';
import icon from '../loading.svg';
import { Transition } from 'react-spring';
import styled from 'styled-components';
const Spinner = styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.4);
    z-index: 20;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 0.3s;
    opacity: 0;
`;
export default class LoadingIcon extends React.Component{
    render(){
        var {spinning} = this.props;
        return ( 
            <Spinner style={{opacity: spinning ? 0 : 1}}><img src={icon} /></Spinner>
        )
    }
};

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
`;
export default class LoadingIcon extends React.Component{
    render(){
        var {spinning} = this.props;
        return ( <Transition from={{ opacity: 0 }} to={{ opacity: spinning ? 1 : 0 }} leave={{opacity: 0}}>
                    {(styles) => <Spinner style={{...styles}}><img src={icon} /></Spinner>}
                </Transition>
        )
    }
};

import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const Match = styled.div`
    display: flex;
    padding: 12px 14px;
    justify-content: space-evenly;
    align-items: stretch;
    flex-direction: column;
    margin: 10px;
    text-align: center;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;
const Group = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Input = styled.input`
    padding: 12px 14px;
    margin: 5px;
    font-size: 2rem;
    &:focus{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
`
const Button = styled.button`
    padding: 14px 20px;
    color: white;
    background-color: #4CAF50;
    margin: 5px;
`
const UPDATE_MATCH = gql`
    mutation UpdateMatch($id: ID!, $homeScore: Int, $awayScore: Int){
        updateMatch(where: {id: $id}, data: {homeScore: $homeScore, awayScore: $awayScore}){
            id
        }
    }
`

export default class MatchAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
            homeScore: this.props.match.homeScore !== -1 ? this.props.match.homeScore : null,
            awayScore: this.props.match.awayScore !== -1 ? this.props.match.awayScore : null
        }
        
    }
    render() {
        return this.props.admin ? (
            <Mutation mutation={UPDATE_MATCH} variables={{id: this.props.match.id, homeScore: this.state.homeScore, awayScore: this.state.awayScore}}>
            {updatePost => 
            <Match style={{...this.props.style}}>
                    <p style={{textAlign: 'center', color: 'lightgrey'}}>{moment(this.props.match.date).format("ddd D MMM YYYY")}</p>
                <Group>
                    <p style={{fontSize: '1.5rem'}}>{this.props.match.homeTeam.name}</p>
                    <span>VS</span>
                    <p style={{fontSize: '1.5rem'}}>{this.props.match.awayTeam.name}</p>
                </Group>
                <Group>
                    <Input placeholder={this.props.match.homeTeam.name + " score"} onChange={e => this.setState({...this.state, homeScore: e.target.value})} type="number" value={this.state.homeScore}/>
                    <Button onClick={() => updatePost().then(res => console.log(res))}>Update</Button>
                    <Input placeholder={this.props.match.awayTeam.name + " score"} onChange={e => this.setState({...this.state, awayScore: e.target.value})} type="number" value={this.state.awayScore}/>
                </Group>
            </Match>
            }
            </Mutation>
        ) : (
            <Match style={{...this.props.style}}>
                    <p style={{textAlign: 'center', color: 'lightgrey'}}>{moment(this.props.match.date).format("ddd D MMM YYYY")}</p>
                <Group>
                    <p style={{fontSize: '1.5rem'}}>{this.props.match.homeTeam.name}</p>
                    <h2>VS</h2>
                    <p style={{fontSize: '1.5rem'}}>{this.props.match.awayTeam.name}</p>
                </Group>
                <Group>
                    <p style={{fontSize: '2rem'}}>{this.state.homeScore}</p>
                    <p style={{fontSize: '2rem'}}>{this.state.awayScore}</p>
                </Group>
            </Match>
        );
    }
}
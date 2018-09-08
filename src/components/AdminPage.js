import React, { Component } from 'react';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Match from './MatchAdmin';
import LoadingIcon from './LoadingIcon';
const Input = styled.input`
    border: none;
    padding: 12px 14px;
    width: 100%;
    background-color: #F1F1F1;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;
const Button = styled.button`
    border: none;
    padding: 14px 20px;
    width: 100%;
    background-color: #4CAF50;
    color: white;
`;
const LoginForm = styled.div`
    max-width: 500px;
    margin: 10px auto;
`;
const Matches = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`
const MATCHES_QUERY = gql`
    query MatchesQuery{
        matches{
    id
    date
    homeTeam{
      id
      name
    }
    awayTeam{
      id
      name
    }
    homeScore
    awayScore
  }
    }
`;
const HASH = '$2a$04$ZY.ZdGcD25kWZsQ3S986fux85gAy2mkzTdS6THxHPetbu.2Jio5SC';
export default class AdminPage extends Component {
    state = { loggedIn: false, loading: false }
    authorise = () => {
        this.setState({...this.state, loading: true});
        bcrypt.compare(this.password.value, HASH, (err, success) => {
            this.setState({...this.state, loading: false, loggedIn: success});
        });
    }
    render() {
        if(this.state.loading) return <LoadingIcon />
        if(!this.state.loggedIn) return (
            <LoginForm>
                <Input innerRef={ref => this.password = ref} placeholder="Password" type="password"/>
                <Button onClick={this.authorise}>Login</Button>
            </LoginForm>)
        return (
            <div>
                <Query query={MATCHES_QUERY}>
                {({data, loading}) => loading || data === undefined ? <LoadingIcon /> : (
                    <Matches>
                        {data.matches.map((match, key) => (
                            <Match admin match={match} key={key}/>
                        ))}
                    </Matches>
                )}
            </Query>
            </div>
        );
    }
}
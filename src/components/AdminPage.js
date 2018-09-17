import React, { Component } from 'react';
import styled from 'styled-components';
import bcrypt from 'bcryptjs';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Match from './MatchAdmin';
import LoadingIcon from './LoadingIcon';
import moment from 'moment';
import { Toggle } from 'react-powerplug';
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
const MATCHES_QUERY = gql`
    query MatchesQuery{
        matches(orderBy: date_ASC){
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
    scorers
  }
    }
`;
const MatchHeader = styled.h2`
    cursor: pointer;
    padding: 18px;
    background-color: ${({on}) => on ? '#4CAF50' : "#eee"};
`;

const MatchGroup = styled.div`
`;

const Reveal = styled.div`
    overflow: auto;
`
const HASH = '$2a$04$ZY.ZdGcD25kWZsQ3S986fux85gAy2mkzTdS6THxHPetbu.2Jio5SC';
export default class AdminPage extends Component {
    state = { loggedIn: false, loading: false, search: '' }
    
    authorise = () => {
        this.setState({...this.state, loading: true});
        bcrypt.compare(this.password.value, HASH, (err, success) => {
            this.setState({...this.state, loading: false, loggedIn: success});
        });
    }
    render() {
        const checkRegex = (match) => {
            var regex = new RegExp(this.state.search, 'i');
            return match.homeTeam.name.search(regex) !== -1 || match.awayTeam.name.search(regex) !== -1 || moment(match.date).format("ddd DD MMM YYYY").search(regex) !== -1 || match.homeScore.toString().search(regex) !== -1 || match.awayScore.toString().search(regex) !== -1 || this.state.search === "";
        }
        if(this.state.loading) return <LoadingIcon />
        if(!this.state.loggedIn) return (
            <LoginForm>
                <Input innerRef={ref => this.password = ref} placeholder="Password" type="password"/>
                <Button onClick={this.authorise}>Login</Button>
            </LoginForm>)
        return (
            <div>
                <Query query={MATCHES_QUERY}>
                {({data, loading}) => {
                    if (loading) return <LoadingIcon />;
                    var past = [];
                    var present = [];
                    var future = [];
                    data.matches.map((match) => {
                        if(checkRegex(match)){
                            if(moment().isAfter(match.date, 'day')){
                            past.push(match);
                        }
                        else if(moment().isSame(match.date, 'day')){
                            present.push(match);
                        }
                        else{
                            future.push(match);
                        }
                    }
                    })
                    return (
                        <React.Fragment>
                        <Input onChange={(e) => this.setState({search: e.target.value})} value={this.state.search} placeholder="Search..."/>
                        <MatchGroup>
                            <Toggle>
                                {({on, toggle}) => 
                                    <React.Fragment>
                                        <MatchHeader on={on} onClick={toggle}>
                                            Today [{present.length}]
                                        </MatchHeader>
                                        <Reveal style={{display: on ? 'block' : 'none'}}>
                                        {present.map((match, key) => <Match admin match={match} key={key}/>)}
                                        </Reveal>
                                    </React.Fragment>
                                }
                            </Toggle>
                            <Toggle>
                                {({on, toggle}) => 
                                    <React.Fragment>
                                        <MatchHeader on={on} onClick={toggle}>
                                            Next Matches [{future.length}]
                                        </MatchHeader>
                                        <Reveal style={{display: on ? 'block' : 'none'}}>
                                            {future.map((match, key) => <Match admin match={match} key={key}/>)}
                                            </Reveal>
                                    </React.Fragment>
                                }
                            </Toggle>
                            <Toggle>
                                {({on, toggle}) => 
                                    <React.Fragment>
                                        <MatchHeader on={on} onClick={toggle}>
                                            Previous Matches [{past.length}]
                                        </MatchHeader>
                                        <Reveal style={{display: on ? 'block' : 'none'}}>
                                        {past.map((match, key) => <Match admin match={match} key={key}/>)}
                                        </Reveal>
                                    </React.Fragment>
                                }
                            </Toggle>
                        </MatchGroup>
                        </React.Fragment>
                    )
                }}
            </Query>
            </div>
        );
    }
}
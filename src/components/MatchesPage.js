import React, { Component } from 'react';
import { MatchGroup, MatchHeader, Reveal } from './Elements';
import gql from 'graphql-tag';
import styled from 'styled-components';
import { Query, Mutation } from 'react-apollo';
import { Toggle } from 'react-powerplug';
import LoadingIcon from './LoadingIcon';
import moment from 'moment';
import Match from './MatchAdmin';
const readMatches = gql`
    query readMatches{
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
        }
    }
`

const Input = styled.input`
    border: none;
    padding: 12px 14px;
    width: 100%;
    background-color: #F1F1F1;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    margin: 10px 0;
`;







export default class MatchesPage extends Component {
    state = {  search: ""}
    render() {
        const checkRegex = (match) => {
            var regex = new RegExp(this.state.search, 'i');
            return match.homeTeam.name.search(regex) !== -1 || match.awayTeam.name.search(regex) !== -1 || moment(match.date).format("ddd DD MMM YYYY").search(regex) !== -1 || match.homeScore.toString().search(regex) !== -1 || match.awayScore.toString().search(regex) !== -1 || this.state.search === "";
        }
        return (
            <React.Fragment>
            <h1>Matches</h1>
            <Query query={gql`
                {
                    matches(orderBy: date_ASC){
                        id
                        homeTeam{
                            id
                            name
                        }
                        awayTeam{
                            id
                            name
                        }
                        date
                        homeScore
                        awayScore
                        scorers
                    }
                }
            `}>
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
                                        {present.map((match, key) => <Match match={match} key={key}/>)}
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
                                            {future.map((match, key) => <Match  match={match} key={key}/>)}
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
                                        {past.map((match, key) => <Match  match={match} key={key}/>)}
                                        </Reveal>
                                    </React.Fragment>
                                }
                            </Toggle>
                        </MatchGroup>
                        </React.Fragment>
                    )
                }}
            </Query>
            </React.Fragment>
        );
    }
}
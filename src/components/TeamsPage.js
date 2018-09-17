import React, { Component } from 'react';
import styled from 'styled-components';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import LoadingIcon from './LoadingIcon';
import {calculateWinsDrawsLosses, calculateLeagueRanks, calculateGD, calculateGoalsAgainst, calculateGoalsFor, calculatePoints} from './LeagueCalculations';
import { Table, MatchGroup, MatchHeader, Reveal } from './Elements';
import Match from './MatchAdmin';
import moment from 'moment';
import {Toggle } from 'react-powerplug';

const Teams = styled.div`
    width: 50%;
    float: left;
    @media (max-width: 768px){
        float: none;
        width: 100%;
    }
`;

const Team = styled.div`
    background-color: #f6f6f6;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    color: black;
    display: block;
    &:hover{
        background-color: #eee;
    }
`;

const Results = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

`;

const TEAMS_QUERY = gql`
    query TeamsQuery{
            teams (orderBy: name_ASC){
                name
            homeMatches(orderBy: date_ASC){
                id
                date
                homeScore
                awayScore
                homeTeam{
                    id
                    name
                }
                awayTeam{
                    id
                    name
                }
            }
            awayMatches(orderBy: date_ASC){
                id
                date
                homeScore
                awayScore
                homeTeam{
                    id
                    name
                }
                awayTeam{
                    id
                    name
                }
            }
            }
        }
`;
const TEAM_QUERY = gql`
    query TeamQuery($name: String!){
        teams(where: {name: $name}){
            name
            homeMatches(orderBy: date_ASC){
                id
                date
                homeScore
                awayScore
                homeTeam{
                    id
                    name
                }
                awayTeam{
                    id
                    name
                }
            }
            awayMatches(orderBy: date_ASC){
                id
                date
                homeScore
                awayScore
                homeTeam{
                    id
                    name
                }
                awayTeam{
                    id
                    name
                }
            }
        }
    }
`;
export default class TeamsPage extends Component {
    state = {
        activeTeam: '',
        activeRank: 0
    }
    render() {
        const checkRegex = (match) => {
            var regex = new RegExp(this.state.search, 'i');
            return match.homeTeam.name.search(regex) !== -1 || match.awayTeam.name.search(regex) !== -1 || moment(match.date).format("ddd DD MMM YYYY").search(regex) !== -1 || match.homeScore.toString().search(regex) !== -1 || match.awayScore.toString().search(regex) !== -1 || this.state.search === "";
        }
        return (
            <React.Fragment>
            <h1>Teams</h1>
            <Teams>
            <Query query={TEAMS_QUERY}>
             {({data, loading}) => {
                 return loading ? <LoadingIcon /> : calculateLeagueRanks(data.teams).map((team, key) => (
                     <Team key={key} style={{backgroundColor: this.state.activeTeam === team.name ? '#a6d6c9' : ''}} onClick={() => this.setState({...this.state, activeTeam: team.name, activeRank: key + 1})}>
                        {team.name}
                    </Team>
                    ));
                }
             } 
            </Query>
            </Teams>
            <Teams>
                <Query query={TEAM_QUERY} variables={{name: this.state.activeTeam}}>
                {({data, loading}) => {
                    if(loading) return <LoadingIcon />
                    if(!data) return null;
                    return  data.teams.map((team, key) => {
                        var {wins, draws, losses} = calculateWinsDrawsLosses(team);
                        var matches = [...team.homeMatches, ...team.awayMatches];
                        matches.sort((a, b) => {
                            return new Date(a.date) - new Date(b.date);
                        });
                        var played = [];
                        var notPlayed = [];
                        matches.map((match) => {
                            if(checkRegex(match)){
                                if(match.homeScore + match.awayScore == -2){
                                notPlayed.push(match);
                            }
                            else{
                                played.push(match);
                            }
                        }
                        })
                        return (
                        <div style={{marginLeft: '2rem'}}>
                            <h1>{team.name}</h1>
                            <Table>
                            <tbody>
                            <tr>
                            <th>Rank</th>
                            <th>Name</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>GD</th>
                            <th>Points</th>
                        </tr>
                            <tr>
                            <td>{this.state.activeRank}</td>
                            <td>{team.name}</td>
                            <td>{wins}</td>
                            <td>{draws}</td>
                            <td>{losses}</td>
                            <td>{calculateGD(team)}</td>
                            <td>{calculatePoints(team)}</td>
                            </tr>
                            </tbody>
                            </Table>
                            <MatchGroup>
                            <Toggle>
                                {({on, toggle}) => 
                                    <React.Fragment>
                                        <MatchHeader on={on} onClick={toggle}>
                                            Played [{played.length}]
                                        </MatchHeader>
                                        <Reveal style={{display: on ? 'block' : 'none'}}>
                                        {played.map((match, key) => <Match match={match} key={key}/>)}
                                        </Reveal>
                                    </React.Fragment>
                                }
                            </Toggle>
                            <Toggle>
                                {({on, toggle}) => 
                                    <React.Fragment>
                                        <MatchHeader on={on} onClick={toggle}>
                                            Next Matches [{notPlayed.length}]
                                        </MatchHeader>
                                        <Reveal style={{display: on ? 'block' : 'none'}}>
                                            {notPlayed.map((match, key) => <Match  match={match} key={key}/>)}
                                            </Reveal>
                                    </React.Fragment>
                                }
                            </Toggle>
                        </MatchGroup>
                        </div>
                       )});
                   }
                } 
                </Query>
            </Teams>
            </React.Fragment>
        );
    }
}
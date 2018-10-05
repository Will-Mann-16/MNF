import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import LoadingIcon from './LoadingIcon';
import styled from 'styled-components';
import { Table } from './Elements';
import {Helmet} from 'react-helmet'
import { Link } from 'react-router-dom';
import { calculateLeague, calculateGoalScorers } from './LeagueCalculations';
const LeagueQuery = gql`
    query LeagueQuery {
        teams(orderBy: name_ASC){
            id
            name
            homeMatches{
                homeScore
                awayScore
                scorers
            }
            awayMatches{
                homeScore
                awayScore
                scorers
            }
        }
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
export default class HomePage extends Component {
    state = {  }
    render() {
        return (
            <React.Fragment>
            <Helmet><title>
                Statistics - MNF
            </title></Helmet>
                    <h1>Statistics</h1>
                    <Query query={LeagueQuery}>
                        {({data, loading}) => {
                            if(loading) return <LoadingIcon />;
                            var league = calculateLeague(data.teams);
                            var scorers = calculateGoalScorers(data.matches);
                            return (
                                <React.Fragment>
                                <h2>League Standings</h2>
                                    <div style={{overflowX: 'auto'}}>
                                <Table>
                                    <tbody>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>Wins</th>
                                        <th>Draws</th>
                                        <th>Losses</th>
                                        <th>Goals Scored</th>
                                        <th>Goals Conceded</th>
                                        <th>Goal Difference</th>
                                        <th>Points</th>
                                    </tr>
                                    {league.map((row, key) => <tr key={key}>
                                        <td>{key + 1}</td>
                                        <Link style={{textDecoration: 'none'}} to={`/teams/${row.name.toLowerCase()}`}><td>{row.name}</td></Link>
                                        <td>{row.wins}</td>
                                        <td>{row.draws}</td>
                                        <td>{row.losses}</td>
                                        <td>{row.goalsScored}</td>
                                        <td>{row.goalsConceded}</td>
                                        <td>{row.gd}</td>
                                        <td>{row.points}</td>
                                        </tr>)}
                                        </tbody>
                                </Table>
                                    </div>
                                <h2>Top Goal Scorers</h2>
                                    <div style={{overflowX: 'auto'}}>
                                    <Table>
                                    <tbody>
                                        <tr>
                                            <th>Rank</th>
                                            <th>Name</th>
                                            <th>House</th>
                                            <th>Goals</th>
                                        </tr>
                                        {scorers.slice(0, 10).map(({name, house, total}, key) => <tr key={key}>
                                            <td>{key + 1}</td>
                                            <td>{name}</td>
                                            <td>{house}</td>
                                            <td>{total}</td>
                                        </tr>)}
                                    </tbody>
                                </Table>
                                    </div>
                                </React.Fragment>
                            )
                        }}
                    </Query>
            </React.Fragment>

        );
    }
}
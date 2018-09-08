import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import LoadingIcon from './LoadingIcon';
import styled from 'styled-components';
const LeagueQuery = gql`
    query LeagueQuery {
        teams(orderBy: name_ASC){
            id
            name
            homeMatches{
                homeScore
                awayScore
            }
            awayMatches{
                homeScore
                awayScore
            }
        }
    }
`
const Table = styled.table`
    border-collapse: collapse;
    width: 100%;
    td, th{
        border: 1px solid #ddd;
        padding: 8px;
        text-align: center;
    }
    tr:nth-child(even){background-color: #f2f2f2;}
    tr:hover {background-color: #ddd;}  
    th{
        padding-top: 12px;
        padding-bottom: 12px;
        color: white;
        background-color: #4CAF50;
    }
`
export default class HomePage extends Component {
    state = {  }
    render() {
        const calculateGoalsFor = (team) => {
            var total = 0;
            team.homeMatches.map((match) => {
                if(match.homeScore !== -1){
                    total += match.homeScore;
                }
            });
            team.awayMatches.map((match) => {
                if(match.awayScore !== -1){
                    total += match.awayScore;
                }
            });
            return total;
        }
        const calculateGoalsAgainst = (team) => {
            var total = 0;
            team.homeMatches.map((match) => {
                if(match.awayScore !== -1){
                    total += match.awayScore;
                }
            });
            team.awayMatches.map((match) => {
                if(match.homeScore !== -1){
                    total += match.homeScore;
                }
            });
            return total;
        }
        const calculateWinsDrawsLosses = (team) => {
            var wins = 0;
            var draws = 0;
            var losses = 0;
            team.homeMatches.map((match) => {
                if(match.homeScore !== -1 && match.awayScore !== -1){
                    if(match.homeScore > match.awayScore){
                        wins += 1;
                    }
                    else if(match.homeScore === match.awayScore){
                        draws += 1;
                    }
                    else{
                        losses += 1;
                    }
                }
            });
            team.awayMatches.map((match) => {
                if(match.homeScore !== -1 && match.awayScore !== -1){
                    if(match.awayScore > match.homeScore){
                        wins += 1;
                    }
                    else if(match.homeScore === match.awayScore){
                        draws += 1;
                    }
                    else{
                        losses += 1;
                    }
                }
            });
            return {wins, draws, losses};
        }  
        return (
            <React.Fragment>
                    <h1>Monday Night Football</h1>
                    <Query query={LeagueQuery}>
                        {({data, loading}) => {
                            if(loading) return <LoadingIcon />;
                            var league = [];
                            data.teams.map((team) => {
                                var {wins, draws, losses} = calculateWinsDrawsLosses(team);
                                var gd = calculateGoalsFor(team) - calculateGoalsAgainst(team);
                                gd = gd > 0 ? "+" + gd : gd + "";
                                var points = wins * 3 + draws * 1;
                                league.push({name: team.name, wins, draws, losses, gd, points});
                            });
                            return (
                                <Table>
                                    <tr>
                                        <th>Name</th>
                                        <th>W</th>
                                        <th>D</th>
                                        <th>L</th>
                                        <th>GD</th>
                                        <th>Points</th>
                                    </tr>
                                    {league.map((row, key) => <tr key={key}>
                                        <td>{row.name}</td>
                                        <td>{row.wins}</td>
                                        <td>{row.draws}</td>
                                        <td>{row.losses}</td>
                                        <td>{row.gd}</td>
                                        <td>{row.points}</td>
                                        </tr>)}
                                </Table>
                            )
                        }}
                    </Query>
            </React.Fragment>

        );
    }
}
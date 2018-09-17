import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import LoadingIcon from './LoadingIcon';
import styled from 'styled-components';
import { Table } from './Elements';
import { calculateLeague } from './LeagueCalculations';
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
`;
export default class HomePage extends Component {
    state = {  }
    render() {
        return (
            <React.Fragment>
            <h1>Monday Night Football</h1>
                    <Query query={LeagueQuery}>
                        {({data, loading}) => {
                            if(loading) return <LoadingIcon />;
                            var league = calculateLeague(data.teams);
                            return (
                                <Table>
                                    <tbody>
                                    <tr>
                                        <th>Rank</th>
                                        <th>Name</th>
                                        <th>GD</th>
                                        <th>Points</th>
                                    </tr>
                                    {league.map((row, key) => <tr key={key}>
                                        <td>{key + 1}</td>
                                        <td>{row.name}</td>
                                        <td>{row.gd}</td>
                                        <td>{row.points}</td>
                                        </tr>)}
                                        </tbody>
                                </Table>
                            )
                        }}
                    </Query>
                    <h2>Welcome to Wellingtons MNF Competition.</h2>
                    <p>Rules:</p>
                    <ul>
                        <li>Matches played at 9pm on the day of the match on either Mansergh or Bawden-Martin (whichever is free).</li>
                        <li>Normal Football Rules apply, referred by committee mostly.</li>
                        <li>If you fail to attend the opposition get a 3-0 walkover.</li>
                        <li>League: 3 points for a win, 1 for a draw, 0 for a loss. Ranked by points, then goal difference, then total goals.</li>
                    </ul>
            </React.Fragment>

        );
    }
}
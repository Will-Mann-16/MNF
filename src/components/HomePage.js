import React, { Component } from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import LoadingIcon from './LoadingIcon';
import styled from 'styled-components';
import { Table } from './Elements';
import { Link } from 'react-router-dom';
import {Helmet} from 'react-helmet'

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
              <Helmet>
                <title>Home - MNF</title>
              </Helmet>
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
                                        <Link style={{textDecoration: 'none'}} to={`/teams/${row.name.toLowerCase()}`}><td>{row.name}</td></Link>
                                        <td>{row.gd}</td>
                                        <td>{row.points}</td>
                                        </tr>)}
                                        </tbody>
                                </Table>
                            )
                        }}
                    </Query>
                    <h2>Welcome to Wellington's MNF Competition</h2>
                    <p>Be sure to check out the rules, matches, current statistics and more on this website!</p>

            </React.Fragment>

        );
    }
}

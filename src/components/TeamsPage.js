import React, { Component } from 'react';
import styled from 'styled-components';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import LoadingIcon from './LoadingIcon';

const Teams = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: space-evenly;
`;

const Team = styled.div`
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;
    &:hover{
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }
    flex-shrink: 0;
    min-width: 200px;
    margin: 5px;
    & h3, & p{
        text-align: center;
    }
`;

const Results = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;

`;

const TEAMS_QUERY = gql`
    query TeamQuery{
            teams (orderBy: name_ASC){
                id
                name
                homeMatches{
                    id
                    homeScore
                    awayScore
                }
                awayMatches{
                    id
                    awayScore
                    homeScore
                }
            }
        }
`;
export default class TeamsPage extends Component {
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
        const renderResults = (team) => {
            var {wins, draws, losses} = calculateWinsDrawsLosses(team);
            return (<Results><p>Wins: {wins}</p><p>Draws: {draws}</p><p>Losses: {losses}</p></Results>);
        }
        return (
            <React.Fragment>
            <h1>Teams</h1>
            <Teams>
            <Query query={TEAMS_QUERY}>
             {({data, loading}) => {
                 return loading ? <LoadingIcon /> : data.teams.map((team, key) => (
                     <Team key={key}>
                        <h3>{team.name}</h3>
                        {renderResults(team)}
                        <p>Goals for: {calculateGoalsFor(team)}</p>
                        <p>Goals against: {calculateGoalsAgainst(team)}</p>
                    </Team>
                    ));
                }
             } 
            </Query>
            </Teams>
            </React.Fragment>
        );
    }
}
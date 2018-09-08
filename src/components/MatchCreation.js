import React, { Component } from 'react';
import { Container } from './Elements';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import robin from 'roundrobin';
import LoadingIcon from './LoadingIcon';
import moment from 'moment';
const createMatches = gql`
    mutation createMatches($homeTeam: ID!, $awayTeam: ID!, $date: DateTime!){
        createMatch(data: {status: PUBLISHED, homeTeam: {connect: {id: $homeTeam}}, awayTeam: {connect: {id: $awayTeam}}, homeScore: -1, awayScore: -1, date: $date}){
            id
        }
    }
`;
export default class MatchesPage extends Component {
    state = {  }
    render() {
        return (
            <Query query={gql`
                {
                    teams{
                        id
                        name
                    }
                }
            `}>
                {({data, loading}) => {
                    if (loading) return <LoadingIcon />;
                    var matches = robin(10, data.teams);
                    var first_date = "09-10-2018";
                    var blackListedWeeks = ["10-22-2018", "10-29-2018"];
                    var blackListedDays = ["10-01-2018", "11-26-2018"];
                    var resultingMatches = [];
                    var date = moment(first_date);
                    matches.map((week, weekKey) => {
                        date.add(weekKey == 0 ? 0 : 1, 'weeks');
                        var tmp = moment(date.format("YYYY-MM-DD")).day("Monday");
                        if(blackListedWeeks.indexOf(tmp.format("MM-DD-YYYY")) !== -1){
                                date.add(1, 'weeks');
                                tmp.add(1, 'weeks');
                                if(blackListedWeeks.indexOf(tmp.format("MM-DD-YYYY")) !== -1){
                                    date.add(1, 'weeks');
                                    tmp.add(1, 'weeks');
                                    
                            }
                        }
                        week.map((match, matchKey) => {
                            if(matchKey < 2){
                                date.day(blackListedDays.indexOf(tmp.format("MM-DD-YYYY")) !== -1 ? "Tuesday" : "Monday");
                            }
                            else if(matchKey < 4){
                                date.day(blackListedDays.indexOf(tmp.format("MM-DD-YYYY")) !== -1 ? "Wednesday" : "Tuesday");
                            }
                            else{
                                date.day(blackListedDays.indexOf(tmp.format("MM-DD-YYYY")) !== -1 ? "Thursday" : "Wednesday");
                            }
                            resultingMatches.push({homeTeam: match[0].id, awayTeam: match[1].id, date: date.format("YYYY-MM-DD")});
                        });
                    });
                    return resultingMatches.map((match, key) => (<Mutation mutation={createMatches} variables={match}>
                            {createMatch => <button onClick={() => createMatch().then(res => console.log(res))}>{moment(match.date).format("ddd DD MMM YYYY")}</button>}
                        </Mutation>))
                }}
            </Query>
        );
    }
}
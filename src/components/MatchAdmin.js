import React, { Component } from 'react';
import styled from 'styled-components';
import moment from 'moment';
import Select from 'react-select/lib/Creatable';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

const Match = styled.div`
    display: flex;
    padding: 12px 14px;
    justify-content: space-evenly;
    align-items: stretch;
    flex-direction: column;
    margin: 10px;
    text-align: center;
    background-color: white;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
`;
const Group = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const Input = styled.input`
    padding: 12px 14px;
    margin: 5px;
    font-size: 1.5rem;
    &:focus{
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
`
const Button = styled.button`
    padding: 14px 20px;
    color: white;
    background-color: #4CAF50;
    margin: 5px;
    border: none;
`
const Scorers = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-between;
    justify-content: flex-start;
`;
const Scorer = styled.div`
    padding: 1rem;
    cursor: pointer;
`;


const UPDATE_MATCH = gql`
    mutation UpdateMatch($id: ID!, $homeScore: Int, $awayScore: Int, $scorers: Json){
        updateMatch(where: {id: $id}, data: {homeScore: $homeScore, awayScore: $awayScore, scorers: $scorers}){
            id
        }
    }
`

export default class MatchAdmin extends Component {
    constructor(props){
        super(props);
        this.state = {
            homeScore: this.props.match.homeScore !== -1 ? this.props.match.homeScore : null,
            awayScore: this.props.match.awayScore !== -1 ? this.props.match.awayScore : null,
            scorers: this.props.match.scorers ? this.props.match.scorers : {home: [], away: []},
            homeScorer: '',
            awayScorer: ''
        }
        
    }
    render() {
        const countScorers = (scorers) => {
            var final = [];
            var indexes = [];
            scorers.map((scorer) => {
                if(indexes.indexOf(scorer) === -1){
                    final.push({scorer, count: 1});
                    indexes.push(scorer);
                }
                else{
                    var index = indexes.indexOf(scorer);
                    var tmp = final[index];
                    tmp.count += 1;
                    final[index] = tmp;
                }
            });
            return final;
        }
        return this.props.admin ? (
            <Mutation mutation={UPDATE_MATCH} variables={{id: this.props.match.id, homeScore: this.state.homeScore, awayScore: this.state.awayScore, scorers: this.state.scorers}}>
            {updatePost => 
            <Match style={{...this.props.style}}>
                    <p style={{textAlign: 'center', color: 'lightgrey'}}>{moment(this.props.match.date).format("ddd D MMM YYYY")}</p>
                <Group>
                    <p style={{fontSize: '1.5rem'}}>{this.props.match.homeTeam.name}</p>
                    <span>VS</span>
                    <p style={{fontSize: '1.5rem'}}>{this.props.match.awayTeam.name}</p>
                </Group>
                <Group>
                    <Input placeholder={this.props.match.homeTeam.name + " score"} onChange={e => this.setState({...this.state, homeScore: e.target.value})} type="number" value={this.state.homeScore}/>
                    <Button onClick={() => updatePost().then(res => console.log(res))}>Update</Button>
                    <Input placeholder={this.props.match.awayTeam.name + " score"} onChange={e => this.setState({...this.state, awayScore: e.target.value})} type="number" value={this.state.awayScore}/>
                </Group>
                <Group>
                    <Scorers>
                    <Input style={{fontSize: '1rem'}} placeholder={`${this.props.match.homeTeam.name} scorers`} onChange={({target}) => this.setState({...this.state, homeScorer: target.value})} value={this.state.homeScorer} />
                    {countScorers(this.state.scorers.home).map(({scorer, count}, key) => <Scorer onClick={() => {
                        this.setState(state => {
                            var scorers = Object.assign({},this.state.scorers);
                            var home = Object.assign([], scorers.home);
                            var index = home.indexOf(scorer);
                            home.splice(index, 1);
                            scorers.home = home;
                            return {
                                ...state,
                                scorers: scorers
                            };
                        });
                    }
                    }>{scorer} [{count}]</Scorer>)}  
                    </Scorers>
                    <Button onClick={() => {
                        var {scorers} = this.state;
                        if(this.state.homeScorer !== ''){
                            scorers.home.push(this.state.homeScorer);
                            this.setState({...this.state, homeScorer: ''});
                        }
                        if(this.state.awayScorer !== ''){
                            scorers.away.push(this.state.awayScorer);
                            this.setState({...this.state, awayScorer: ''});
                        }
                        this.setState({...this.state, scorers});
                    }}>Add</Button>
                    <Scorers>
                    <Input style={{fontSize: '1rem'}} placeholder={`${this.props.match.awayTeam.name} scorers`} onChange={({target}) => this.setState({...this.state, awayScorer: target.value})} value={this.state.awayScorer} />
                    {countScorers(this.state.scorers.away).map(({scorer, count}, key) => <Scorer onClick={() => {
                        this.setState(state => {
                            var scorers = Object.assign({},this.state.scorers);
                            var away = Object.assign([], scorers.away);
                            var index = away.indexOf(scorer);
                            away.splice(index, 1);
                            scorers.away = away;
                            return {
                                ...state,
                                scorers: scorers
                            };
                        });
                    }
                    }>{scorer} [{count}]</Scorer>)}                    
                    </Scorers>         
            </Group>
            </Match>
            }
            </Mutation>
        ) : (
            <Match style={{...this.props.style}}>
                    <p style={{textAlign: 'center', color: 'lightgrey'}}>{moment(this.props.match.date).format("ddd D MMM YYYY")}</p>
                <Group>
                    <p style={{fontSize: '1.5rem'}}>{this.props.match.homeTeam.name}</p>
                    <h2>VS</h2>
                    <p style={{fontSize: '1.5rem'}}>{this.props.match.awayTeam.name}</p>
                </Group>
                <Group>
                    <p style={{fontSize: '2rem'}}>{this.state.homeScore}</p>
                    <p style={{fontSize: '2rem'}}>{this.state.awayScore}</p>
                </Group>
                <Group>
                <Scorers>
                {countScorers(this.state.scorers.home).map(({scorer, count}) => <Scorer>{scorer} [{count}]</Scorer>)}
                </Scorers>
                <Scorers>
                {countScorers(this.state.scorers.away).map(({scorer, count}) => <Scorer>{scorer} [{count}]</Scorer>)}
                </Scorers>         
        </Group>
            </Match>
        );
    }
}
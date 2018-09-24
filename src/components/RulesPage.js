import React from 'react';
import {Helmet} from 'react-helmet';

export default class RulesPage extends React.Component{
  render(){
    return(
      <React.Fragment>
        <Helmet>
          <title>Rules - MNF</title>
        </Helmet>
        <h1>Rules</h1>
        <p>This is the page where the rules of the competition are located.</p>
        <ul>
            <li>Matches played at 9pm on the day of the match on either Mansergh or Bawden-Martin (whichever is free).</li>
            <li>Only Fifth, Lower Sixth and Upper Sixth can play/support, and only if excused by your respective HMs/Tutors.</li>
            <li>The teams are 8-a-side, and the games are played until 9:45 or until the lights turn out.</li>
            <li>Normal Football Rules apply, referred by committee mostly.</li>
            <li>If any team or their supporters are found to be causing disruptive behaviour, they will be excluded from the competition and all their fixtures removed.</li>
            <li>If you fail to attend the opposition get a 3-0 walkover.</li>
            <li>League: 3 points for a win, 1 for a draw, 0 for a loss. Ranked by points, then goal difference, then total goals.</li>
            <li>The matches run all the way to the penultimate week of term, so every team can play every team.</li>
        </ul>
      </React.Fragment>
    );
  }
}

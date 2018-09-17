export const calculateGoalsFor = (team) => {
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
export const calculateGoalsAgainst = (team) => {
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
export const calculateWinsDrawsLosses = (team) => {
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
export const calculateLeague = (teams) => {
    var league = [];
    teams.map((team) => {
        var {wins, draws, losses} = calculateWinsDrawsLosses(team);
        var gd = calculateGD(team);
        var points = calculatePoints(team);
        var goals = calculateGoalsFor(team);
        league.push({name: team.name, wins, draws, losses, gd, points, goals});
    });
    return league.sort((a,b) => {
        return a.points === b.points ? b.gd === a.gd ? b.goals - a.goals : b.gd - a.gd : b.points - a.points;
    })
}
export const calculateGD = (team) => {
    var gd = calculateGoalsFor(team) - calculateGoalsAgainst(team);
    return gd > 0 ? "+" + gd : gd + "";

}
export const calculatePoints = (team) => {
    var {wins, draws, losses} = calculateWinsDrawsLosses(team);
    return wins*3 + draws*1;
}
export const calculateLeagueRanks = (teams) => {
    var league = teams.map((team) => {
        return {...team, points: calculatePoints(team), gd: calculateGD(team)};
    });
    return league.sort((a,b) => {
        return a.points === b.points ? b.gd - a.gd : b.points - a.points;
    });
}
export const calculateGoalScorers = (matches) => {
    var scorers = [];
    var indexes = [];
    matches.map((match) => {
        if(match.scorers){
            match.scorers.home.map((scorer) => {
                if(indexes.indexOf(scorer) === -1){
                    scorers.push({name: scorer, house: match.homeTeam.name, total: 1});
                    indexes.push(scorer);
                }
                else{
                    var index = indexes.indexOf(scorer);
                    var data = scorers[index];
                    data.total += 1;
                    scorers[index] = data;
                }
            });
            match.scorers.away.map((scorer) => {
                if(indexes.indexOf(scorer) === -1){
                    scorers.push({name: scorer, house: match.awayTeam.name, total: 1});
                    indexes.push(scorer);
                }
                else{
                    var index = indexes.indexOf(scorer);
                    var data = scorers[index];
                    data.total += 1;
                    scorers[index] = data;
                }
            });
        }
    });
    return scorers.sort((a, b) => b.total - a.total);
}
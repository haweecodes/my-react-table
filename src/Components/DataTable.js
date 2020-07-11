import React, { useState } from 'react';
import './DataTable.css';
import Modal from './Modal'
import { ArrowBackIos, ArrowForwardIos, LastPage, FirstPage }from '@material-ui/icons';
import { Button, IconButton, Card, CardContent  }from '@material-ui/core';

class Team {
    #name;
    #played;
    #win;
    #loss;
    #draw;

    constructor(name="", played=0, win=0, loss=0, draw=0){
        this.#name = name;
        this.#played = played;
        this.#win = win;
        this.#loss = loss;
        this.#draw = draw;
    }
    teamPlayed(){
        this.#played++;
    }
    teamWon(){
        this.#win++;
    }
    teamLost(){
        this.#loss++;
    }
    teamDrew(){
        this.#draw++;
    }
    getName(){
        return this.#name;
    }
    getWin(){
        return this.#win;
    }
    getLoss(){
        return this.#loss;
    }
    getDraw(){
        return this.#draw;
    }
    getPlayed(){
        return this.#played;
    }
}

// receive props parent component and render a table with the header and value
export default function DataTable(props) {
    const [isModal, setIsModal] = useState(false);
    const [teamInfo, setTeamInfo] = useState({});
    const [startingIndex, setIndex] = useState(0);
    let teamStats = new Map();

    props.items.map((day) => {
        day.matches.map((match) => {
            // check if the team exists if not add them
            if(!teamStats.has(match.team1.code)){
                teamStats.set(match.team1.code, new Team(match.team1.name));
            };
            if(!teamStats.has(match.team2.code)){
                teamStats.set(match.team2.code, new Team(match.team2.name));
            }

            // get the team data
            let team1 = teamStats.get(match.team1.code);
            let team2 = teamStats.get(match.team2.code);

            // score the teams and input data

            if(match.score1 > match.score2){
                team1.teamWon();
                team2.teamLost();
            } else if(match.score2 > match.score1){
                team1.teamLost();
                team2.teamWon();
            } else {
                team1.teamDrew();
                team2.teamDrew();
            }
            team1.teamPlayed();
            team2.teamPlayed();

            teamStats.set(match.team1.code, team1);
            teamStats.set(match.team2.code, team2);
        })
    })

    const showteamStats = (value) => {
        switchModal(true);
        const Team = teamStats.get(value);
        setTeamInfo(Team);
    }

    const switchModal = (value) => {
        setIsModal(value);
    }

    const goToFirst = () => {
        setIndex(0);
    }

    const goToLast = () => {
        setIndex(props.items.length - 1);
    }

    const backwardPaginate = () => {
        if(startingIndex > 0) {
            setIndex(startingIndex - 1);
        }
    }
    
    const forwardPaginate = () => {
        if(startingIndex < props.items.length-1) {
            setIndex(startingIndex + 1);
        }
    }

    if(props.items.length > 0){
        return(
            <div>
            <h4>{props.items[startingIndex].name}</h4>
            <div className="table_wrapper">
                <Card>
                    <CardContent>
                <table>
                    {/* table head */}
                    <thead>
                        <tr>
                            {
                                props.headers.map((item) => {
                                    return <th key={item}>{item}</th>
                                })
                            }
                        </tr>
                    </thead>
    
                    {/* table body */}
                    <tbody>
                        {
                            props.items[startingIndex].matches.map((match, i) => {
                               return (
                               <tr key={i}>
                                    <td className="table_content-date">{match.date}</td>
                                    <td className="table_content-teamName">
                                        <a href="#" onClick={(e) => showteamStats(match.team1.code)}>
                                            {match.team1.name}
                                        </a> - 
                                        <a href="#" onClick={(e) => showteamStats(match.team2.code)}>
                                            {match.team2.name}
                                        </a>
                                    </td>
                                    <td className="table_content-score">{match.score1} - {match.score2}</td>
                                </tr>
                               )
                            })
                        }
                    </tbody>
    
                    {/* table footer */}
                    <tfoot>
                        <tr>
                            <td colSpan="3" className="footer_wrapper">
                                {startingIndex === 0 ? 1 : startingIndex*10} - {startingIndex === 0 ? 10 : startingIndex*10 + 10} of {(props.items.length * 10)}
                                <IconButton onClick={(e) => {goToFirst()}}><FirstPage fontSize="small" /></IconButton>
                                <IconButton onClick={(e) => {backwardPaginate()}}><ArrowBackIos fontSize="small" /></IconButton>
                                <IconButton onClick={(e) => {forwardPaginate()}}><ArrowForwardIos fontSize="small"/></IconButton>
                                <IconButton onClick={(e) => {goToLast()}}><LastPage fontSize="small" /></IconButton>
                            </td>
                        </tr>
                    </tfoot>
                </table>    
                </CardContent>
            </Card>
            </div>
            
            <Modal team={teamInfo} isVisible={isModal} onClick={switchModal}/>
            </div>
        );
    } else {
        return(
            <div>
                <p>Loading...</p>
            </div>
        )
    }
}
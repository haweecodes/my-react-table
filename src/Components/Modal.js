import React from 'react';
import './Modal.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

export default function Modal(props) {
    console.log(props)
    if(props.isVisible){
        return(
            <div className="modal_wrapper-overlay">
                <Card  className="card_wrapper">
                    <CardContent className="card_wrapper-content">
                        <table>
                            <thead>
                                <tr className="team_name-wrapper">
                                    <td colSpan="4" className="team_name">{props.team.getName()}</td>
                                </tr>
                                <tr>
                                    <th>
                                        Played
                                    </th>
                                    <th>
                                        Won
                                    </th>
                                    <th>
                                        Lost
                                    </th>
                                    <th>
                                        Draw
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{props.team.getPlayed()}</td>
                                    <td>{props.team.getWin()}</td>
                                    <td>{props.team.getLoss()}</td>
                                    <td>{props.team.getDraw()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </CardContent>
                    <CardActions>
                        <Button onClick={(e) => props.onClick(false)}>Close</Button>
                    </CardActions>
                </Card>
            </div>
        )
    } else {
        return '';
    }
}

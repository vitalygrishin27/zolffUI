import React, {Component} from 'react';
import {Button, ButtonGroup, Card, Col, Form, Image, Table,} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faEdit, faList, faStepBackward, faStepForward, faTrash} from "@fortawesome/free-solid-svg-icons";

export default class Summary extends Component {
    componentDidMount() {
        this.fillSelectBoxs();
    }

    fillSelectBoxs() {
        if (this.props.masterPlayersGoals.length > 0) {
            const selList = document.getElementsByName("selectGoals0")
            for (let j = 0; j < selList.length; j++) {
                const sel = selList[j];
                sel.value = this.props.masterPlayersGoals[j];
            }
        }
        if (this.props.slavePlayersGoals.length > 0) {
            const selList = document.getElementsByName("selectGoals1")
            for (let j = 0; j < selList.length; j++) {
                const sel = selList[j];
                sel.value = this.props.slavePlayersGoals[j];
            }
        }

        if (this.props.masterPlayersYellowCards.length > 0) {
            const selList = document.getElementsByName("selectYellowCards0")
            for (let j = 0; j < selList.length; j++) {
                const sel = selList[j];
                sel.value = this.props.masterPlayersYellowCards[j];
            }
        }
        if (this.props.slavePlayersYellowCards.length > 0) {
            const selList = document.getElementsByName("selectYellowCards1")
            for (let j = 0; j < selList.length; j++) {
                const sel = selList[j];
                sel.value = this.props.slavePlayersYellowCards[j];
            }
        }

        if (this.props.masterPlayersRedCards.length > 0) {
            const selList = document.getElementsByName("selectRedCards0")
            for (let j = 0; j < selList.length; j++) {
                const sel = selList[j];
                sel.value = this.props.masterPlayersRedCards[j];
            }
        }
        if (this.props.slavePlayersRedCards.length > 0) {
            const selList = document.getElementsByName("selectRedCards1")
            for (let j = 0; j < selList.length; j++) {
                const sel = selList[j];
                sel.value = this.props.slavePlayersRedCards[j];
            }
        }
    }


    render() {
        const {masterPlayersList, slavePlayersList, masterPlayersGoals, slavePlayersGoals, countMasterGoals, countSlaveGoals, countMasterYellowCards, countSlaveYellowCards, countMasterRedCards, countSlaveRedCards, masterPlayersYellowCards, slavePlayersYellowCards, masterPlayersRedCards, slavePlayersRedCards} = this.props;

        return (
            <div>
                <Card className={"text-white"} style={{backgroundColor: 'transparent'}}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Результати ігри
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant={"dark"} style={{"width": "100%", 'display': 'table'}}>
                            <thead>
                            <tr align={"center"}>
                                <th width={"50%"}>{this.props.masterTeamName}</th>
                                <th>{this.props.slaveTeamName}</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr align={"center"}>
                                <td colSpan={"2"}>Рахунок матчу</td>
                            </tr>
                            <tr align={"center"}>
                                <td>{countMasterGoals}</td>
                                <td>{countSlaveGoals}</td>
                            </tr>
                            <tr align={"center"}>
                                <td colSpan={"2"}>Голи</td>
                            </tr>
                            <tr>
                                <td>
                                    {Array(parseInt(countMasterGoals)).fill(null).map((value, index) => (
                                        <div>
                                            <select disabled name="selectGoals0" className="form-control"
                                                    onSelect={this.onSelect}>
                                                {this.props.masterPlayersList.map((player) => (
                                                    <option value={player.id}
                                                            id={player.id}>{player.playerName}</option>
                                                ))}
                                            </select>
                                            <br/>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {Array(parseInt(countSlaveGoals)).fill(null).map((value, index) => (
                                        <div>
                                            <select disabled name="selectGoals1" className="form-control"
                                                    onSelect={this.onSelect}>
                                                {this.props.slavePlayersList.map((player) => (
                                                    <option value={player.id}
                                                            id={player.id}>{player.playerName}</option>
                                                ))}
                                            </select>
                                            <br/>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                            <tr align={"center"}>
                                <td colSpan={"2"}>Жовті картки</td>
                            </tr>
                            <tr>
                                <td>
                                    {Array(parseInt(countMasterYellowCards)).fill(null).map((value, index) => (
                                        <div>
                                            <select disabled name="selectYellowCards0" className="form-control"
                                                    onSelect={this.onSelect}>
                                                {this.props.masterPlayersList.map((player) => (
                                                    <option value={player.id}
                                                            id={player.id}>{player.playerName}</option>
                                                ))}
                                            </select>
                                            <br/>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {Array(parseInt(countSlaveYellowCards)).fill(null).map((value, index) => (
                                        <div>
                                            <select disabled name="selectYellowCards1" className="form-control"
                                                    onSelect={this.onSelect}>
                                                {this.props.slavePlayersList.map((player) => (
                                                    <option value={player.id}
                                                            id={player.id}>{player.playerName}</option>
                                                ))}
                                            </select>
                                            <br/>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                            <tr align={"center"}>
                                <td colSpan={"2"}>Червоні картки</td>
                            </tr>
                            <tr>
                                <td>
                                    {Array(parseInt(countMasterRedCards)).fill(null).map((value, index) => (
                                        <div>
                                            <select disabled name="selectRedCards0" className="form-control"
                                                    onSelect={this.onSelect}>
                                                {this.props.masterPlayersList.map((player) => (
                                                    <option value={player.id}
                                                            id={player.id}>{player.playerName}</option>
                                                ))}
                                            </select>
                                            <br/>
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    {Array(parseInt(countSlaveRedCards)).fill(null).map((value, index) => (
                                        <div>
                                            <select disabled name="selectRedCards1" className="form-control"
                                                    onSelect={this.onSelect}>
                                                {this.props.slavePlayersList.map((player) => (
                                                    <option value={player.id}
                                                            id={player.id}>{player.playerName}</option>
                                                ))}
                                            </select>
                                            <br/>
                                        </div>
                                    ))}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Button size="sm" variant="warning" type="reset">
                                        <FontAwesomeIcon icon={faStepBackward}/> {"Назад"}
                                    </Button>{'  '}

                                </td>
                                <td>
                                    <Button size="sm" variant="success" type="submit">
                                        {"Зберегти"} <FontAwesomeIcon icon={faStepForward}/>
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}
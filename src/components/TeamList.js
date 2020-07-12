import React, {Component} from "react";

import {Card, Table, Image, ButtonGroup, Button} from "react-bootstrap";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faAddressBook} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import ToastMessage from "./ToastMessage";
import {Link} from "react-router-dom";

export default class TeamList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            teamIds: '',
            role: '',
            isAuthenticated: false,
            currentSeasonYear: null,
            isLoadingSeason: false,
            isLoadingTeamList: false,
            isErrorLoading: false,
            teams: [],
        };
    }

//Вставить анотацию на класс контроллер @CrossOrigin(origins="http://.....")
    componentDidMount() {
        this.setState({
            userName: localStorage.getItem("user"),
            teamIds: localStorage.getItem("teamIds"),
            role: localStorage.getItem("role"),
            isAuthenticated: localStorage.getItem("user") && localStorage.getItem("teamIds") && localStorage.getItem("role"),
            isErrorLoading: false,
        });
      //  alert(localStorage.getItem("teamIds").match("32"));
        this.getCurrentSeason();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.currentSeasonYear !== prevState.currentSeasonYear) {
            this.getAllTeamsInCurrentSeason(this.state.currentSeasonYear);
        }
      //  alert(localStorage.getItem("teamIds"));
    };

    getAllTeamsInCurrentSeason(year) {
        this.setState({
            isLoadingTeamList: true,
        });
        axios.get(localStorage.getItem("host")+"teamsInSeason/" + this.state.currentSeasonYear)
            //  axios.get("http://localhost:8092/ui/teamsInSeason/"+this.state.currentSeasonYear)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    teams: data,
                    isLoadingTeamList: false,
                    isErrorLoading: false,
                });
            }).catch(() => {
            this.setState({
                isErrorLoading: true,
                isLoadingTeamList: false,
            });
        });
    };

    getCurrentSeason() {
        this.setState({
            isLoadingSeason: true,
        });
        axios.get(localStorage.getItem("host")+"currentSeason")
            // axios.get("http://localhost:8092/ui/currentSeason")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    currentSeasonYear: data,
                    isLoadingSeason: false,
                    isErrorLoading: false,
                });
            }).catch(() => {
            this.setState({
                isErrorLoading: true,
                isLoadingSeason: false,
            });
        });
    };

    getAllTeams() {
        axios.get("https://derff.herokuapp.com/ui/teams")
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    teams: data,
                    isLoading: false,
                    isErrorLoading: false,
                });
            }).catch(() => {
            this.setState({
                isErrorLoading: true,
                isLoading: false
            });
        });
    };

    deleteTeam = (teamId) => {
        axios.delete("https://derff.herokuapp.com/ui/team/" + teamId)
            //  axios.delete("http://localhost:8092/ui/team/" + teamId)
            .then(response => {
                if (response.data != null) {
                    console.log("Delete OK");
                    console.log(response.data);
                    this.setState({"error": false, "show": true, "blockScreen": false});
                    setTimeout(() => this.setState({"show": false}), 3000);
                    this.setState({
                        teams: this.state.teams.filter(team => team.id !== teamId)
                    });
                }
            }).catch(() => {
            this.setState({"error": true, "show": true, "blockScreen": false});
            setTimeout(() => this.setState({"show": false}), 3000);
            console.log("Error during deletion");
        });
    };

    render() {
        const isLoadingSeason = this.state.isLoadingSeason;
        const isLoadingTeamList = this.state.isLoadingTeamList;
        const isErrorLoading = this.state.isErrorLoading;
        let info;
        /*  if (isLoadingSeason || isLoadingTeamList) {
              info = <tr align={"center"}>
                  <td colSpan={"5"}>Идет загрузка</td>
              </tr>;
          }*/
        if (isErrorLoading) {
            info = <tr align={"center"}>
                <td colSpan={"5"}>Ошибка загрузки</td>
            </tr>;
        }
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <ToastMessage
                        show={this.state.show}
                        error={this.state.error}
                        message={!this.state.error ? "Удаление прошло успешно!" : "Ошибка при удалении"}
                    />
                </div>
                <Card className={"text-white"} style={{ backgroundColor: 'transparent' }} >
                    <Card.Header><FontAwesomeIcon icon={faList}/> Команды сезона</Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant={"dark"}>
                            <thead>
                            <tr>
                                <th>№</th>
                                <th>Название</th>
                                <th>Населенный пункт</th>
                                <th>Руководитель</th>
                                <th>Действия</th>
                            </tr>
                            </thead>
                            <tbody>
                            {info}
                            {
                                this.state.teams.length === 0 && !isLoadingSeason && !isLoadingTeamList ?
                                    <tr align={"center"}>
                                        <td colSpan={"5"}>Нет зарегистрированных команд</td>
                                    </tr> :
                                    isLoadingSeason || isLoadingTeamList ?
                                        <tr align={"center"}>
                                            <td colSpan={"5"}>Идет загрузка</td>
                                        </tr> :
                                        this.state.teams.map((team, count) => (
                                            <tr key={team.id}>
                                                <td>{count + 1}</td>
                                                <td><Image src={team.symbolString} roundedCircle width={"50"}
                                                           height={"50"}/>{' '}{team.teamName}</td>
                                                <td>{team.village}</td>
                                                <td>{team.boss}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Link className="btn btn-sm btn-outline-primary"
                                                              to={"/team/" + team.id + "/" + team.teamName + "/playerList"}>{' '}
                                                            <FontAwesomeIcon icon={faAddressBook}/>
                                                        </Link>
                                                        <Link className="btn btn-sm btn-outline-warning"
                                                              style={{"display": (this.state.role && this.state.role.match("ADMINISTRATOR")) || this.state.isAuthenticated && (this.state.teamIds.match(team.id) || this.state.role.match("ADMINISTRATOR"))  ? "block" : "none"}}
                                                              to={"edit/" + team.id}>{' '}
                                                            <FontAwesomeIcon icon={faEdit}/>
                                                        </Link>
                                                        <Button size={"sm"} variant={"outline-danger"}
                                                                style={{"display": this.state.role && this.state.role.match("ADMINISTRATOR") ? "block" : "none"}}
                                                                onClick={this.deleteTeam.bind(this, team.id)}><FontAwesomeIcon
                                                            icon={faTrash}/></Button>{' '}
                                                    </ButtonGroup>


                                                </td>

                                            </tr>
                                        ))
                            }

                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>
            </div>
        );
    }
}
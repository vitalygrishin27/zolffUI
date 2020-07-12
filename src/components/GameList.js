import React, {Component} from 'react';
import axios from 'axios';
import {Button, ButtonGroup, Card, Dropdown, DropdownButton, Image, Table} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAddressBook, faList, faRegistered, faTrash} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

export default class GameList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host: localStorage.getItem("host"),
            tours: [],
            activeTour: '',
            gamesInCurrentTour: []
        };
    }

    componentDidMount() {
        this.setState({
            isLoadingTourList: false,
            isLoadingGameList: false,
            isErrorLoading: false,
        });
        this.getToursList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.activeTour !== prevState.activeTour) {
            this.getGamesForTour(this.state.activeTour);
        }
    }

    getGamesForTour = (tour) => {
        this.setState({
            isLoadingGameList: true,
            isErrorLoading: false,
        });
        axios.get(this.state.host + "tours/" + tour)
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({
                    gamesInCurrentTour: data,
                    isLoadingGameList: false,
                    isErrorLoading: false,
                });
            }).catch(() => {
            this.setState({
                gamesInCurrentTour: [],
                isErrorLoading: true,
                isLoadingGameList: false,
            });
        });
    }

    getToursList = () => {
        this.setState({
            isLoadingTourList: true,
            isErrorLoading: false,
        });
        axios.get(this.state.host + "tours")
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                this.setState({
                    tours: data,
                    isLoadingTourList: false,
                    isErrorLoading: false,
                });
            }).catch(() => {
            this.setState({
                isErrorLoading: true,
                isLoadingTourList: false,
            });
        });
    }

    addNewGame = () => {

    }

    deleteGame = () => {

    }

    render() {
        const isLoadingGameList = this.state.isLoadingGameList;
        const isLoadingTourList = this.state.isLoadingTourList;
        const isErrorLoading = this.state.isErrorLoading;
        return (
            <div>
                <DropdownButton id="dropdown-basic-button" title=
                    {isLoadingTourList ? "Идет загрузка" : "Обрати тур"}>
                    {this.state.tours.map((tour) => (
                        <Dropdown.Item onClick={() => this.setState({activeTour: tour.tourName})}>
                            {tour.tourName}
                        </Dropdown.Item>
                    ))}
                </DropdownButton>

                <Card className={"text-white"} style={{backgroundColor: 'transparent'}}>
                    <Card.Header><FontAwesomeIcon icon={faList}/> Ігри {this.state.activeTour}
                        {'  '}<Button size="sm" variant="info" type="button"
                                      style={{"display": (localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR")) ? "inline" : "none"}}
                                      onClick={this.addNewGame.bind()}>
                            <FontAwesomeIcon icon={faList}/> Додати гру
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover variant={"dark"} style={{"width": "50%", 'display': 'table'}}>
                            <thead>
                            <tr style={{"color": "#ffcb3b"}}>
                                <th colSpan='5' style={{
                                    "fontSize": "15pt",
                                    "fontWeight": "600",
                                    "textAlign": "center"
                                }}>{this.state.activeTour}</th>
                            </tr>
                            <tr>
                                <th>Дата</th>
                                <th>Господарі</th>
                                <th>Гості</th>
                                <th>Результат</th>
                                {(localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR")) ?
                                    <th>Дії</th> : ""}
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.gamesInCurrentTour.length === 0 && !isLoadingGameList && !isLoadingTourList ?
                                    <tr align={"center"}>
                                        <td colSpan={"11"}>Ігри відстуні</td>
                                    </tr> :
                                    isLoadingGameList || isLoadingTourList ?
                                        <tr align={"center"}>
                                            <td colSpan={"11"}>Процес завантаження</td>
                                        </tr> :
                                        this.state.gamesInCurrentTour.map((game) => (
                                            <tr key={game.id}>
                                                <td>{game.date ? game.date.toString().substring(0, 10) : ''}</td>
                                                <td style={{whiteSpace: "nowrap"}}><Image src={game.masterTeamSymbolString} roundedCircle width={"50"}
                                                           height={"50"}/>{'  '}
                                                    {game.masterTeamName}
                                                </td>
                                                <td style={{whiteSpace: "nowrap"}}><Image src={game.slaveTeamSymbolString} roundedCircle width={"50"}
                                                           height={"50"}/>{'  '}
                                                    {game.slaveTeamName}
                                                </td>
                                                {game.resultSave ?
                                                    <td style={{
                                                        "fontSize": "15pt",
                                                        "fontWeight": "600",
                                                        "textAlign": "center"
                                                    }}>{game.masterGoalsCount + " : " + game.slaveGoalsCount}</td> :
                                                    <td> - </td>
                                                }
                                                {(localStorage.getItem("role") && localStorage.getItem("role").match("ADMINISTRATOR")) ?
                                                    <td>
                                                        <ButtonGroup>
                                                            <Link className="btn btn-sm btn-outline-primary"
                                                                  to={"/games/result/" + game.id + "/" + game.masterTeamName + "/" + game.slaveTeamName}>{' '}
                                                                <FontAwesomeIcon icon={faRegistered}/>
                                                            </Link>{' '}
                                                            <Link className="btn btn-sm btn-outline-warning"
                                                                  to={"/games/" + game.id}>{' '}
                                                                <FontAwesomeIcon icon={faAddressBook}/>
                                                            </Link>{' '}
                                                            <Button size={"sm"} variant={"outline-danger"}
                                                                    onClick={this.deleteGame.bind(this, game.id)}><FontAwesomeIcon
                                                                icon={faTrash}/></Button>{' '}
                                                        </ButtonGroup>
                                                    </td>
                                                    : ""}
                                            </tr>
                                        ))
                            }

                            </tbody>
                        </Table>

                    </Card.Body>
                </Card>
                <div style={{"height": 50}}></div>
            </div>
        );
    }
}
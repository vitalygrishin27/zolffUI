import React from 'react';
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";

import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Team from "./components/Team";
import TeamList from "./components/TeamList";
import PlayerList from "./components/PlayerList";
import Player from "./components/Player";
import Standings from "./components/Standings";
import Statistic from "./components/Statistic";
import Login from "./components/Login";
import GameList from "./components/GameList";
import GameResultWizard from "./components/wizard/GameResultWizard";

function App() {
    const marginTop = {
        marginTop: "20px"
    };

    return (
        <Router>
            <NavigationBar/>
            <Container>
                <Row>
                    <Col lg={12} style={marginTop}>
                        <Switch>
                            <Route path={"/"} exact component = {Welcome}/>
                            <Route path={"/login"} exact component = {Login}/>
                            <Route path={"/add"} exact component = {Team}/>
                            <Route path={"/edit/:id"} exact component = {Team}/>
                            <Route path={"/list"} exact component = {TeamList}/>
                            <Route path={"/team/:id/:teamName/playerList"} exact component = {PlayerList}/>
                            <Route path={"/team/:teamId/:teamName/players/:id"} exact component = {Player}/>
                            <Route path={"/standings"} exact component = {Standings}/>
                            <Route path={"/statistic"} exact component = {Statistic}/>
                            <Route path={"/games"} exact component = {GameList}/>
                            <Route path={"/games/result/:gameId/:masterTeamName/:slaveTeamName"} exact component = {GameResultWizard}/>
                        </Switch>
                    </Col>
                </Row>
            </Container>
            <Footer/>
        </Router>
    );
}

export default App;

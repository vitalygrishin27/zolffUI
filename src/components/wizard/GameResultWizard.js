import React, {Component} from 'react';
import CountGoalsForm from "./CountGoalsForm";
import PlayersGoalsForm from "./PlayersGoalsForm";
import axios from "axios";
import CountYellowCardsForm from "./CountYellowCardsForm";
import PlayersYellowCardsForm from "./PlayersYellowCardsForm";
import CountRedCardsForm from "./CountRedCardsForm";
import PlayersRedCardsForm from "./PlayersRedCardsForm";
import Summary from "./Summary";

export default class GameResultWizard extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isErrorLoading: false,
            step: 1,
            gameId: 0,
            countMasterGoals: 0,
            countSlaveGoals: 0,
            countMasterYellowCards: 0,
            countSlaveYellowCards: 0,
            countMasterRedCards: 0,
            countSlaveRedCards: 0,
            masterPlayersList: [],
            slavePlayersList: [],
            masterPlayersGoals: [],
            slavePlayersGoals: [],
            masterPlayersYellowCards: [],
            slavePlayersYellowCards: [],
            masterPlayersRedCards: [],
            slavePlayersRedCards: [],
            masterTeamName: '',
            slaveTeamName: ''
        }
    }

    componentDidMount() {
        const gameId = +this.props.match.params.gameId;
        const masterTeamName = this.props.match.params.masterTeamName;
        const slaveTeamName = this.props.match.params.slaveTeamName;
        this.setState({
            step: 1,
            gameId: gameId,
            masterTeamName: masterTeamName,
            slaveTeamName: slaveTeamName
        });
        this.getPlayersListForGame(gameId);
    }

    getPlayersListForGame = (gameId) => {
        this.setState({
            isLoading: true,
            isErrorLoading: false,
        });
        axios.get(localStorage.getItem("host") + "games/" + gameId)
            //  axios.get("http://localhost:8092/ui/standings")
            .then(response => response.data)
            .then((data) => {
                console.log(data);
                data.map((list, count) => (
                    count === 0 ?
                        this.setState({
                            masterPlayersList: list,
                        }) :
                        this.setState({
                            slavePlayersList: list,
                        })
                ))
                this.setState({
                    isLoading: false,
                    isErrorLoading: false,
                });
            }).catch(() => {
            this.setState({
                isLoading: false,
                isErrorLoading: true,
            });
        });
    }

    submitToServer = () =>{

    }

    handleChange = input => e => {
        this.setState({[input]: e.target.value})
    }

    nextStep = () => {
        this.setState({
            step: this.state.step + 1
        })
    }

    prevStep = () => {
        this.setState({
            step: this.state.step - 1
        })
    }

    render() {
        const {step} = this.state;
        const {masterPlayersList, slavePlayersList, masterPlayersGoals, slavePlayersGoals, countMasterGoals, countSlaveGoals, countMasterYellowCards, countSlaveYellowCards, countMasterRedCards, countSlaveRedCards, masterPlayersYellowCards, slavePlayersYellowCards, masterPlayersRedCards, slavePlayersRedCards} = this.state;
        const values = {
            masterPlayersList,
            slavePlayersList,
            masterPlayersGoals,
            slavePlayersGoals,
            masterPlayersYellowCards,
            slavePlayersYellowCards,
            countMasterGoals,
            countSlaveGoals,
            countMasterYellowCards,
            countSlaveYellowCards,
            countMasterRedCards,
            countSlaveRedCards,
            masterPlayersRedCards,
            slavePlayersRedCards
        };

        switch (this.state.step) {
            case 1:
                return (
                    <div>
                        <CountGoalsForm nextStep={this.nextStep}
                                        masterTeamName={this.state.masterTeamName}
                                        slaveTeamName={this.state.slaveTeamName}
                                        handleChange={this.handleChange}
                                        values={values}
                        />
                    </div>
                );
                break;
            case 2:
                return (

                    <PlayersGoalsForm nextStep={this.nextStep}
                                      prevStep={this.prevStep}
                                      masterTeamName={this.state.masterTeamName}
                                      slaveTeamName={this.state.slaveTeamName}
                                      handleChange={this.handleChange}
                                      masterPlayersList={this.state.masterPlayersList}
                                      slavePlayersList={this.state.slavePlayersList}
                                      masterPlayersGoals={this.state.masterPlayersGoals}
                                      slavePlayersGoals={this.state.slavePlayersGoals}
                                      values={values}>
                    </PlayersGoalsForm>
                )
                break;
            case 3:
                return (
                    <CountYellowCardsForm nextStep={this.nextStep}
                                          prevStep={this.prevStep}
                                          masterTeamName={this.state.masterTeamName}
                                          slaveTeamName={this.state.slaveTeamName}
                                          handleChange={this.handleChange}
                                          values={values}>
                    </CountYellowCardsForm>
                )
                break;
            case 4:
                return (
                    <PlayersYellowCardsForm nextStep={this.nextStep}
                                            prevStep={this.prevStep}
                                            masterTeamName={this.state.masterTeamName}
                                            slaveTeamName={this.state.slaveTeamName}
                                            handleChange={this.handleChange}
                                            masterPlayersList={this.state.masterPlayersList}
                                            slavePlayersList={this.state.slavePlayersList}
                                            masterPlayersYellowCards={this.state.masterPlayersYellowCards}
                                            slavePlayersYellowCards={this.state.slavePlayersYellowCards}
                                            values={values}>
                    </PlayersYellowCardsForm>
                )
                break;
            case 5:
                return (
                    <CountRedCardsForm nextStep={this.nextStep}
                                       prevStep={this.prevStep}
                                       masterTeamName={this.state.masterTeamName}
                                       slaveTeamName={this.state.slaveTeamName}
                                       handleChange={this.handleChange}
                                       values={values}>
                    </CountRedCardsForm>
                )
                break;
            case 6:
                return (
                    <PlayersRedCardsForm nextStep={this.nextStep}
                                         prevStep={this.prevStep}
                                         masterTeamName={this.state.masterTeamName}
                                         slaveTeamName={this.state.slaveTeamName}
                                         handleChange={this.handleChange}
                                         masterPlayersList={this.state.masterPlayersList}
                                         slavePlayersList={this.state.slavePlayersList}
                                         masterPlayersRedCards={this.state.masterPlayersRedCards}
                                         slavePlayersRedCards={this.state.slavePlayersRedCards}
                                         values={values}>
                    </PlayersRedCardsForm>
                )
                break;
            case 7:
                return (
                    <Summary nextStep={this.nextStep}
                             prevStep={this.prevStep}
                             gameId={this.state.gameId}
                             submitToServer={this.submitToServer}
                             countMasterGoals={this.state.countMasterGoals}
                             countSlaveGoals={this.state.countSlaveGoals}
                             countMasterYellowCards={this.state.countMasterYellowCards}
                             countSlaveYellowCards={this.state.countSlaveYellowCards}
                             countMasterRedCards={this.state.countMasterRedCards}
                             countSlaveRedCards={this.state.countSlaveRedCards}
                             masterPlayersList={this.state.masterPlayersList}
                             slavePlayersList={this.state.slavePlayersList}
                             masterPlayersGoals={this.state.masterPlayersGoals}
                             slavePlayersGoals={this.state.slavePlayersGoals}
                             masterPlayersYellowCards={this.state.masterPlayersYellowCards}
                             slavePlayersYellowCards={this.state.slavePlayersYellowCards}
                             masterPlayersRedCards={this.state.masterPlayersRedCards}
                             slavePlayersRedCards={this.state.slavePlayersRedCards}
                             masterTeamName={this.state.masterTeamName}
                             slaveTeamName={this.state.slaveTeamName}>
                    </Summary>
                )
                break;
        }
    }

}
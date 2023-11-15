import React from 'react'
import Card from './Card'
import Instructions from './Instructions'
import GameOver from './GameOver'
import { Grid } from 'semantic-ui-react'
import {generateGame, updateGame} from '../game-logic/game-logic'
import URL from '../url'

class Game extends React.Component{
  constructor(){
    super()
    this.startTime = 60
    this.state = {
      score: 0,
      gameOver: false,
      showInstructions: true,
      leaderBoard: [],
      timeLeft: this.startTime,
      timerId: null,
      gameBoard: generateGame(),
      cardsFlipped: [null, null],
      match: false
    }
  }

  componentDidMount(){
    fetch(URL)
    .then(res => res.json())
    .then(this.updateLeaderBoard)
  }

  updateLeaderBoard = (data) => {
    this.setState({leaderBoard: data})
  }

  handleFlip = (villager) => {
    let cards = [...this.state.cardsFlipped]
    if(cards[0] === null){
      cards[0] = villager
      this.setState({cardsFlipped: cards})
    }else if(cards[1] === null){
      cards[1] = villager
      this.setState({cardsFlipped: cards}, this.checkCards)
    }
  }

  makeMatch = (villagerId) => {
    var audio = new Audio(`${process.env.PUBLIC_URL}/assets/sounds/chime.mp3`)
    audio.play();
    this.unFlipCards()
    this.setState(prevState => ({score: prevState.score + 10, match: true}))
    setTimeout(() => this.updateBoard(villagerId), 1000)
  }

  checkCards = () => {
    if(this.state.cardsFlipped[0].villagerId === this.state.cardsFlipped[1].villagerId){
      this.makeMatch(this.state.cardsFlipped[0].villagerId)
    }else{
      this.unFlipCards()
    }
  }

  unFlipCards = () => {
    setTimeout(()=>{this.setState({cardsFlipped: [null, null]})}, 750)
  }

  updateBoard = (villagerId) => {
    this.setState({match: false, gameBoard: updateGame(this.state.gameBoard, villagerId)})
  }

  startGame = () => {
    clearInterval(this.state.timerId)
    this.setState({
      showInstructions: false,
      gameOver: false,
      gameBoard: generateGame(),
      timeLeft: this.startTime,
      score: 0,
      timerId: setInterval(this.decreaseTimer, 1000),
      cardsFlipped: [null, null],
    })
  }

  decreaseTimer = () => {
    if(this.state.timeLeft > 0){
      this.setState(prevState => ({timeLeft: this.state.timeLeft - 1}))
    }else{
      this.setState({gameOver: true})
    }
  }

  render(){
    return (
      <div>
        <div className="game">
        <Grid centered>
          <Grid.Column textAlign='center'>
            <h3>Score: {this.state.score}</h3>
          </Grid.Column>
        </Grid>
        <Grid centered columns={5}>
          {this.state.gameBoard.board.map((villagerId, index) => (
            <Grid.Column key={index}>
              <Card
                villager={{index, villagerId}}
                isFlipped={this.state.cardsFlipped.find(villager => villager && villager.index === index)}
                handleFlip={this.handleFlip}
                match={this.state.match}
              />
            </Grid.Column>
          ))}
        </Grid>
        <Grid>
          <Grid.Column textAlign='center'>
            <h4>Time Left: {this.state.timeLeft}</h4>
          </Grid.Column>
        </Grid>
        </div>
        <Instructions
          startGame={this.startGame}
          timeLeft={this.state.timeLeft}
          showInstructions={this.state.showInstructions}
        />
        <GameOver
          startGame={this.startGame}
          score={this.state.score}
          showGameOver={this.state.gameOver}
          updateLeaderBoard={this.updateLeaderBoard}
          leaderBoard={this.state.leaderBoard}
        />
      </div>
    )
  }
}

export default Game

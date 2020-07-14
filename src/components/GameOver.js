import React from 'react'
import { Button, Header, Modal, Form } from 'semantic-ui-react'

class GameOver extends React.Component {
  constructor(){
    super()
    this.state = {
      submitted: false,
      name: ""
    }
  }

  onChange = (e) => {
    this.setState({name: e.target.value})
  }

  submitForm = () => {
    this.setState({submitted: true})
    fetch("https://ac-memory-match-backend.herokuapp.com/users", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify({
        name: this.state.name,
        score: this.props.score
      })
    }).then(res => res.json())
    .then(this.props.updateLeaderBoard)
  }

  render(){
    let {showGameOver, score, startGame} = this.props
    return (
      <Modal open={showGameOver} basic size='small'>
        <Header content={`You're score is ${score}`} />
        {
          this.state.submitted ?
          (
            <div>
              <Modal.Content>
                <h4>Your score has been submitted!</h4>
              </Modal.Content>
            </div>
          )
          :
          (
            <div>
              <Modal.Content>
                <h4>Enter your name to submit your score:</h4>
              </Modal.Content>
              <Form inverted onSubmit={this.submitForm}>
                <Form.Input fluid placeholder='Name' onChange={this.onChange}/>
                <Button inverted color='green' type='submit'>Submit</Button>
              </Form>
            </div>
          )
        }
        <Modal.Actions>
          <Button onClick={()=>{this.setState({submitted: false}); startGame()}} inverted>
            Restart Game
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default GameOver

import React from 'react'
import { Button, Header, Modal, Form } from 'semantic-ui-react'

class GameOver extends React.Component {
  constructor(){
    super()
    this.state = {
      submitted: false
    }
  }

  submitForm = () => {
    this.setState({submitted: true})
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
                <Form.Input fluid placeholder='Name' />
                <Button inverted color='green' type='submit'>Submit</Button>
              </Form>
            </div>
          )
        }
        <Modal.Actions>
          <Button onClick={startGame} inverted>
            Restart Game
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}

export default GameOver

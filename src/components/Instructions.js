import React from 'react'
import { Button, Header, Modal } from 'semantic-ui-react'

const Instructions = ({showInstructions, timeLeft, startGame}) => {
  return (
    <Modal open={showInstructions} basic size='small'>
      <Header content='Instructions' />
      <Modal.Content>
        <h3>Match as many villagers as you can in {timeLeft} seconds.
        As you match villagers, others will take their place. You'll never run
        out of potential matches.</h3>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={startGame} inverted>
          Start Game
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default Instructions

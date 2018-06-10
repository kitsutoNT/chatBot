import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import request from 'superagent'

// Set CSS styles
const styles = theme => ({
  container: {
    display: 'inline'
  },
  formControl: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'inline',
  },
  button: {
    margin: theme.spacing.unit,
    display: 'inline',
  }
})

/**
 * React component for input text box and send button
 */
class InputForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }

  // Set state of "text" to text currently in the input box
  handleChange = event => {
    this.setState({ text: event.target.value })
  }
/**
 * Triggered when user click on "SEND" Button.
 * Send user_input to server in order to get new created log,
 * then pass new log to parent component <ChatBot>
 * @param  {Object} event Event object created when user clock on "SEND" Button.
 */
  post = event => {
    request
    .post('/chat')
    .send({user_input: this.state.text})
    .end((err, newLog) => {
      if (err) {
        console.error("Error at requesting POST /chat: " + err)
        return
      }
      // Once "SEND" button is clicked, empty input box
      this.setState({text: ''})
      // This object will be used in <ChatBot> component
      this.props.onClick({
        newLogToBePushed: newLog.body
      })
    })
  }

  render() {
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel>
            Talk to me!
          </InputLabel>
          <Input className={classes.input} value={this.state.text} id="text" onChange={this.handleChange}/>
        </FormControl>
        <Button className={classes.button} variant="raised" color="primary" onClick={this.post}>
          Send
        </Button>
      </div>
    )
  }

}

// Export LogField to be used in main.js
export default withStyles(styles)(InputForm)

import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormControl from '@material-ui/core/FormControl'
import Button from '@material-ui/core/Button'
import request from 'superagent'

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

class InputForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {text: ''}
  }

  handleChange = event => {
    this.setState({ text: event.target.value })
  }

  post = event => {
    request
    .post('/chat')
    .send({user_input: this.state.text})
    .end((err, data) => {
      if (err) {
        console.error(err)
        return
      }
      this.setState({text: ''})
      this.props.onClick({
        value: data.body
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

export default withStyles(styles)(InputForm)
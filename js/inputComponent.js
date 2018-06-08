import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import request from 'superagent';

const styles = theme => ({
  container: {
    display: 'block'
  },
  formControl: {
    margin: theme.spacing.unit
  },
  input: {
    display: 'inline',
    float: 'left'
  },
  button: {
    margin: theme.spacing.unit,
    display: 'inline',
    float: 'left'
  }
});

class ComposedTextField extends React.Component {
  constructor(props) {
        super(props);
        this.state = {text: '', newlog: this.props.logs }
    }

  handleChange = event => {
    this.setState({ text: event.target.value });
  };

  post= event => {
    request
    .post('/chat')
    .send({user_input: this.state.text})
    .end((err, data) => {
      if (err) {
        console.error(err)
      }
      this.setState({text: ''})
      this.props.onClick({
          value: data.body
      })
    })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <FormControl className={classes.formControl}>
          <InputLabel>Talk to me!</InputLabel>
          <Input className={classes.input} value={this.state.text} id="text" onChange={this.handleChange} />
          <Button className={classes.button} variant="raised" color="primary" onClick={this.post}>
            Send
          </Button>
        </FormControl>
      </div>
    );
  }
}
export default withStyles(styles)(ComposedTextField);

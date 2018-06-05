import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import request from 'superagent'

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
});

class LogField extends React.Component {
  constructor (props){
    super(props)
    this.state={
      logs: []
    }
  }

  componentWillMount () {
    this.loadLogs()
  }

  loadLogs() {
    request
    .get('/history/list')
    .end((err, res) => {
      if (err) {
        console.error(err)
        return
      }
      this.setState({logs: res.body})
    })
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    console.log("before logHtml created")
    console.log(this.state.logs)
    console.log(this.state.logs[0])
    const logHtml = this.state.logs.map(log =>(
      console.log(log.response_timestamp)
      <div>
        <li key={log._id + "1"}> {log.response_timestamp} You : {log.user_input}</li>
        <li key={log._id}> {log.response_timestamp} Bot : {log.bot_response}</li>
      </div>
    ))
    console.log("after logHtml created")
    console.log(logHtml)
    return (
      <div>
      <form className={classes.container} noValidate autoComplete="off">
        <TextField
          id="multiline-static"
          label="Chat Log"
          multiline
          disabled
          rows="10"
          className={classes.textField}
          onChange={this.props.onTextChange}
          margin="normal"
          >
            <ul>{logHtml}</ul>
            </TextField>
        </form>
      </div>
      );
    }
  }

  LogField.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(LogField);

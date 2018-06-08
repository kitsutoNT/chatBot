import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import request from 'superagent'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: 'inherit',
  },
  ul: {
    backgroundColor: 'inherit',
    padding: 0,
  },
});

class LogField extends React.Component {
  constructor (props){
    super(props)
    this.state={
      logs: this.props.logs
    }
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;
    const logJSON = this.props.logs
    console.log("AfterlogJSON" + JSON.stringify(logJSON))
    const logHtml = logJSON.reverse().map(log =>(
      <div>
        <ListItem><ListItemText key={log._id + "1"} primary={log.response_timestamp.slice(-8) + " You > "  + log.user_input}/></ListItem>
        <ListItem><ListItemText key={log._id} primary={log.response_timestamp.slice(-8) + " Bot > "   + log.bot_response}/></ListItem>
      </div>
    ))
    console.log("LogHtml: " + logHtml)
    return (
      <List className={classes.root}>
          {logHtml}
        </List>
      );
    }
  }

  LogField.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(LogField);

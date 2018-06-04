import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
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
        />
      </form>
    );
  }
}

LogField.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LogField);

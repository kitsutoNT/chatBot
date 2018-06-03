import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  container: {
    display: 'inline'
  },
  button: {
    margin: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
});

function SendButton(props) {
  const { classes } = props;
  return (
    <div className={classes.container}>
      <Button className={classes.button} variant="raised" color="primary">
        Send
      </Button>
    </div>
  );
}

SendButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SendButton);

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import request from 'superagent'

// Set CSS styles
const styles = theme => ({
  list: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: 600,
  }
})

/**
 * React component for displaying field of log history
 */
class LogField extends React.Component {
  constructor(props) {
    super(props)
    // The state of logs[] is inherited from parent component, <ChatBot>.
    this.state = {logs: this.props.logs}
  }

  render() {
    const { classes } = this.props
    const logJSON = this.props.logs
    // Iterate through array logs[] using map method, render a pair of user and bot response
    const logHtml = logJSON.map(log =>(
      <div>
        <ListItem><ListItemText key={log._id + "1"} primary={log.response_timestamp.slice(-8) + " You > "  + log.user_input}/></ListItem>
        <ListItem><ListItemText key={log._id} primary={log.response_timestamp.slice(-8) + " Bot > "   + log.bot_response}/></ListItem>
      </div>
    ))

    return (
      <List className={classes.list}>
        {logHtml}
      </List>
    )
  }

}
// Export LogField to be used in main.js
export default withStyles(styles)(LogField)

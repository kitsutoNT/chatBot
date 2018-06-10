/**
 * The main react component ChatBot containing two children components.
 * ChatBot will respond with appropriate text based on user input
 * and will be rendered in LogField.
 * @author kitsutoNT
 */

import React from 'react'
import ReactDOM from 'react-dom'
import InputForm from './inputForm'
import LogField from './logField'
import request from 'superagent'

/**
 * Main component that render two children components, InputForm and LogField.
 * This main component will be rendered under <div id="root" in index.html.
 */
class ChatBot extends React.Component {
  constructor (props) {
    super(props)
    /**
     * logs[] state will be used to communicate children components,
     * InputForm and Logfiled
     */
    this.state = {logs: []}
  }

  // Call loadLogs method to load log history before componenet will be rendered.
  componentWillMount () {
    this.loadLogs()
  }

  // Send request to server via superagent to get log history
  loadLogs () {
    request
    .get('/history/list')
    .end((err, logHistory) => {
      if (err) {
        console.error("Error at requesting GET /history/list: " + err)
        return
      }
      // Reverse log order as it is descending order.
      const reversedLogs = logHistory.body.reverse()
      this.setState({logs: reversedLogs})
    })
  }

  /**
   * Triggered on onClick event.
   * Update the state of logs[], which will affect logField component as its state is set to prop.state
   * @param  {Object} clickEvent Event object when user click "SEND" button.
   */
  updateLogState (clickEvent) {
    const newLog = clickEvent.newLogToBePushed
    console.log("newLog Created: " + JSON.stringify(newLog))
    const updatedLogs = this.state.logs
    // Add new log object into logs[] array
    updatedLogs.push(newLog)
    this.setState({
      logs: updatedLogs
    })
  }

  render() {
    return (
      <div>
        <InputForm onClick={clickEvent => this.updateLogState(clickEvent)}/>
        <LogField logs={this.state.logs}/>
      </div>
    )
  }

}

// Render ChatBot component under <div id="root"> in index.html
ReactDOM.render(
  <ChatBot />, document.getElementById('root')
)

import React from 'react';
import ReactDOM from 'react-dom';
import ComposedTextField from './inputComponent';
import LogField from './logField'
import request from 'superagent';

class ChatBot extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      logs: [],
      newLog: []
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
      const reverseLogOrder = res.body.reverse()
      this.setState({logs: res.body})
      console.log("After state.log is set: " + this.state.logs)
    })
  }

  updateLogState(e) {
    const newLog = e.value
    console.log("newLog Created in updateLogState : " + JSON.stringify(newLog))
    const newLogs = this.state.logs
    console.log(newLogs.push(newLog))
    this.setState({
      logs: newLogs
    })
    console.log("After newLog is set" + JSON.stringify(this.state.logs))
  }

  render() {
    console.log("before first render: " + this.state.logs)
    return (
      <div>
        <ComposedTextField onClick={e => this.updateLogState(e)}/>
        <LogField logs={this.state.logs}/>
      </div>
    )
  }

}



ReactDOM.render(
  <ChatBot />, document.getElementById('root')
);

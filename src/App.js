import React, { Component } from 'react';
import Timer from './Timer'
import Controls from './Controls'

//no need to modify anything in this component
class App extends Component {
  
  // state contains "theUpdateInterval," (num) "timerIDs" (arr)
  state = { 
    theUpdateInterval: 1,
    timerIDs: []
  }

  // As soon as it mounts, add one timerID object to the timerID array
  componentDidMount() {this.handleAddTimer()}

  // Controls takes updateIntervalSetting, theUpdateInterval, and handleAddTimer
  render() {
    console.log(this.state.timerIDs);
    return (
      <div className="App">
        <header>
          <h1>MultiTimer</h1>
          <Controls updateIntervalSetting={this.updateIntervalSetting} theUpdateInterval={this.state.theUpdateInterval} handleAddTimer={this.handleAddTimer}/>
        </header>
        <div className="TimerGrid">
          {this.renderTimers()}
        </div>

      </div>
    );
  }

  // returns array of components written in JSX, mapped from this.state.timerIDs
  renderTimers = () => this.state.timerIDs.map(({id, anUpdateInterval}) => <Timer key={id} id={id} removeTimer={this.removeTimer} theUpdateInterval={anUpdateInterval}/>)


  // adds a random number for timer ID
  handleAddTimer = () => {
    this.setState(prevState => ({
      timerIDs: [
        // Spread the members of the prevState's timerIDs array
        // Note that we're calling the previous state "prevState,"" but often you see it called just "state"
        ...prevState.timerIDs,
        // and add one more
        {
          // Use the prevState of the interval to update it
          theUpdateInterval: prevState.theUpdateInterval,
          id: Date.now()
        }
      ]
    }))
  }

  // removeTimer updates state, removing any timer that matches the provided id
  removeTimer = id => {
    this.setState(prevState => ({
      // Filter out the one timerId object with the matching timer.id and return the rest of the array
      timerIDs: prevState.timerIDs.filter(timer => timer.id !== id)
    }))
  }

  // update theUpdateInterval in state
  updateIntervalSetting=inc=>this.setState(pS=>pS.theUpdateInterval+inc<=1
    ?
    {theUpdateInterval:1}
    :
    {theUpdateInterval:pS.theUpdateInterval+inc})

}

export default App;

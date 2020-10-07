import React, { Component } from 'react';

import Timer from './Timer'
import Controls from './Controls'

//no need to modify anything in this component
class App extends Component {

  state = {
    updateInterval: 1,
    timerIDs: []
  }

  componentDidMount() {
    this.handleAddTimer()
  }

  render() {
    return (
      <div className="App">
        <header>
          <h1>MultiTimer</h1>
          <Controls updateIntervalSetting={this.updateIntervalSetting} updateInterval={this.state.updateInterval} handleAddTimer={this.handleAddTimer}/>
        </header>
        <div className="TimerGrid">
          {this.renderTimers()}
        </div>

      </div>
    );
  }

  // returns array of components written in JSX, mapped from this.state.timerIDs
  //updateInterval props takes in the updateInterval property from App state which is being iterated on in the map. That is chaged by updateInterval Setting function below
  renderTimers = () => this.state.timerIDs.map(({id, updateInterval}) => <Timer key={id} id={id} removeTimer={this.removeTimer} updateInterval={updateInterval}/>)


  // adds a random number for timer ID
  handleAddTimer = () => {
    this.setState(prevState => ({
      timerIDs: [
        ...prevState.timerIDs,
        {
          updateInterval: prevState.updateInterval,
          id: Date.now()
        }
      ]
    }))
  }

  // removeTimer updates state, removing any timer that matches the provided author
  //why use prevState? WHy not this.state? you want to affect the value of before setState was called. Since setState does batching, its sometimes important to know what the previous state was when you want to update the new state based on the previous state value.
  removeTimer = id => {
    this.setState(prevState => ({
      timerIDs: prevState.timerIDs.filter(timer => timer.id !== id)
    }))
  }

  updateIntervalSetting = increment => {
    this.setState(prevState => {
      if (prevState.updateInterval + increment <= 1) return { updateInterval: 1 }
      return {
        updateInterval: prevState.updateInterval + increment
      }
    })
  }

}

export default App;

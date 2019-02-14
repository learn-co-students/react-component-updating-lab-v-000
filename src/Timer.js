import React, { Component } from 'react'

class Timer extends Component {
  constructor() {
    super()
    this.timer = React.createRef()
    this.state = {
      time: 0,
      color: '#' + Math.floor(Math.random() * 16777215).toString(16),
    }
  }

  // Does *not* affect state, changes font color
  componentDidUpdate() {
    this.timer.current.style.color =
      '#' + Math.floor(Math.random() * 16777215).toString(16)
  }

// you may want to limit how often a component updates, or control what triggers
// an update. that's when you should use shouldComponentUpdate.
// returns a boolean *always*
// this allowes the component to update only when there is a change in state
// aka only when the timer increments.  
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.time === nextState.time) {
      return false
    }
    return true
  }

  // initializes an interval
  componentDidMount() {
    this.interval = setInterval(this.clockTick, this.props.updateInterval * 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    const { time, color, className, logText } = this.state
    return (
      <section className="Timer" style={{ background: color }} ref={this.timer}>
        <h1>{time}</h1>
        <button onClick={this.stopClock}>Stop</button>
        <aside className="logText">{logText}</aside>
        <small onClick={this.handleClose}>X</small>
      </section>
    )
  }

  clockTick = () => {
    this.setState(prevState => ({
      time: prevState.time + this.props.updateInterval,
    }))
  }

  stopClock = () => {
    clearInterval(this.interval)
    this.setState({ className: 'hidden' })
  }

  // for the 'x' button,
  handleClose = () => {
    this.props.removeTimer(this.props.id)
  }
}

export default Timer

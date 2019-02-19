import React, { Component } from 'react';

class Timer extends Component {

  constructor() { // state contains "time" "color"; props contain ref for "timer"
    super()
    this.timer = React.createRef()
    this.state = {
        time: 0,
        color: '#'+Math.floor(Math.random()*16777215).toString(16),
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.time === nextState.time) {
      return false
    }
    return true
  }
  componentDidUpdate(){
    this.timer.current.style.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  componentDidMount(){ // Set the interval
    this.interval = setInterval(this.clockTick, this.props.theUpdateInterval*1000)
  }
  // Clear the interval
  componentWillUnmount(){clearInterval(this.interval)}
  render() {
    const { time, color, logText } = this.state
    return (
      <section className="Timer" style={{background: color}} ref={this.timer}>
        <h1>{ time }</h1>
        <button onClick={ this.stopClock }>Stop</button>
        <aside className="logText">{ logText }</aside>
        <small onClick={ this.handleClose }>X</small>
      </section>
    );
  }
  // Set the state of 'time'
  clockTick =()=>this.setState(prevState=>({time: prevState.time + this.props.theUpdateInterval}))
  // Clear the interval and set class to hidden
  stopClock = () => {
    clearInterval(this.interval)
    this.setState({className: "hidden"})
  }
  // Close the timer window by calling removeTimer
  handleClose =()=>this.props.removeTimer(this.props.id)
}

export default Timer;

import React, { PureComponent } from 'react';

class Controls extends PureComponent {

  render() {
    const uIS=this.props.updateIntervalSetting
    const theI=this.props.theUpdateInterval
    const hAT=this.props.handleAddTimer
    return (
      <div>
        <div>
          <button type="text" onClick={()=>uIS(-1)}>-</button>
          {theI}
          <button type="text" onClick={()=>uIS(1)}>+</button>
        </div>
        <button onClick={hAT}>Add New Timer</button>
      </div>
    );
  }
}
export default Controls

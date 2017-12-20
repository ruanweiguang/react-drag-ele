
import React, { Component } from 'react'
import _ from "lodash";

class dragBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: this.props
    }

  }

  componentDidMount() {
    let style = _.cloneDeep(this.props.children.props.style);
    let newChildren = _.cloneDeep(this.props.children);
    let timeId = new Date().getTime() + Math.random();
    newChildren.props.timeId = timeId;
    this.setState({ style, newChildren, timeId});
  }


  render() {
    let { style, props, timeId} = this.state;
    return (
      <div style={style} className={this.props.className}
        id={timeId}
      >
        {this.state.newChildren}
      </div>
    )
  }
}

module.exports = dragBox;
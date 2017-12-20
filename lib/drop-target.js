import React, { Component } from 'react'
import _ from "lodash";

class DropTarget extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: this.props
    }
    /**
     * 是否使用H5拖拽
     */
    this.onDrop = this.onDrop.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
  }

  componentDidMount() {
    let style = _.cloneDeep(this.props.children.props.style);
    this.setState({ style });
  }

  onDrop(evt) {
    document.body.style.userSelect = 'none';
    let props = _.cloneDeep(this.state.props);
    evt.preventDefault();
    let id = evt.dataTransfer.getData("Text");
    let pointer = { x: evt.clientX, y: evt.clientY };
    let scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
    let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    let location = { left: evt.target.getBoundingClientRect().left + scrollLeft, top: evt.target.getBoundingClientRect().top + scrollTop }
    this.props.onDropOverEle(pointer, location);
    let ele = document.getElementById(id);
    ele.style.left = location.left + "px";
    ele.style.top = location.top + "px";
    evt.target.appendChild(ele);
  }

  onDragOver(evt) {
    document.body.style.userSelect = 'none';
    let props = _.cloneDeep(this.state.props);
    evt.preventDefault();
  }

  render() {
    let { style, props } = this.state;
    return (
      <div style={style}
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}>
        {this.props.children}
      </div>
    )
  }
}

module.exports = DropTarget;
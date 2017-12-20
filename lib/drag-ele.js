import React, { Component } from 'react'
import _ from "lodash";

class DragEle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      props: this.props,
      scrollDistance: {},
      mousePoiner: {}
    }
    this.id = new Date().getTime();
    this.onMouseDown = this.onMouseDown.bind(this);
    this.mouseDragMove = this.mouseDragMove.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    /**
     * 是否使用H5拖拽
     */
    this.onDragStart = this.onDragStart.bind(this);
  }

  componentDidMount() {
    let style = _.cloneDeep(this.props.children.props.style);
    style.cursor = "move";
    this.index = 1;
    delete style.border;
    delete style.borderWidth;
    style.position = "absolute";
    let timeId = new Date().getTime();
    this.setState({ style },() => {
      this.searchDataBox();
    });
  }

  searchDataBox() {
    /**
     * 获取拖动的盒子
     */
    this.dragBox = document.getElementById(this.props.timeId);
  }

  onMouseDown(evt) {
    /**
     * 鼠标距离当前元素位置
     */
    if (!this.state.props.isUseH5Drag) {
      let style = _.cloneDeep(this.state.style);
      this.index += 1;
      style.zIndex = this.index;
      if(style.transition) {
        delete style.transition;
      }

      let scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
      let scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
      let that = evt.target;
      let eleX = evt.pageX - that.getBoundingClientRect().left - scrollLeft;
      let eleY = evt.pageY - that.getBoundingClientRect().top - scrollTop;
      let scrollDistance = { scrollLeft, scrollTop}
      let mousePoiner = { 
        x: evt.pageX, 
        y: evt.pageY, 
        left: that.getBoundingClientRect().left - scrollLeft,
        top: that.getBoundingClientRect().top - scrollTop,
      };
      let currentPoint = { eleX, eleY };
      this.setState({ currentPoint, style, mousePoiner, scrollDistance }, () => {
        window.addEventListener("mousemove", this.mouseDragMove);
        window.addEventListener('mouseup', this.onMouseUp);
      });
    }
  }

  moveDistance(move) {
    let props = _.cloneDeep(this.state.props);
    let moveX = move.moveX;
    let moveY = move.moveY;
    let mousePoiner = this.state.mousePoiner;
    let initX = mousePoiner.x;
    let initY = mousePoiner.y;
    let minMoveDistance = props.minMoveDistance;
    let maxMoveDistance = props.maxMoveDistance;

    let moveValue = props.moveX ? moveX : moveY;
    let initValue = props.moveX ? initX : initY;
      //只允许x轴移动
    let conditions = null; //条件
    if (minMoveDistance && !maxMoveDistance) {
      conditions = Math.abs(moveValue - initValue ) >= minMoveDistance;
    } else if (!minMoveDistance && maxMoveDistance) {
      conditions = Math.abs(moveValue - initValue ) <= maxMoveDistance;
    } else if (minMoveDistance && maxMoveDistance) {
      conditions = Math.abs(moveValue - initValue) >= minMoveDistance && (moveValue - initValue) < maxMoveDistance;
    }

    if (conditions) {
      return true;
    }else {
      return false;
    }

  }

  limitMove(eleLeft, eleTop) {
    /**
     * 限制拖动范围
     */
    
    let eleWidth = this.state.style.width;
    let eleHeight = this.state.style.height;
    let parentsLeft = this.dragBox.offsetLeft;
    let parentsTop = this.dragBox.offsetTop;
    let parentsWidth = this.dragBox.offsetWidth;
    let parentsHeight = this.dragBox.offsetHeight;

    /**
     * 重新赋值拖动数据
     */

    if (parentsLeft >= eleLeft) {
      eleLeft = parentsLeft;
    }else {
      eleLeft = Math.min(parentsLeft + parentsWidth, eleLeft + eleWidth) - eleWidth;
    }

    if (parentsTop >= eleTop) {
      eleTop = parentsTop;
    } else {
      eleTop = Math.min(parentsTop + parentsHeight, eleTop + eleHeight) - eleHeight;
    }

    return { eleLeft, eleTop};
  }

  mouseDragMove(evt) {
    document.body.style.userSelect = 'none';
    let that = evt.target;
    let style = _.cloneDeep(this.state.style);
    let currentPoint = _.cloneDeep(this.state.currentPoint);
    let moveX = evt.pageX;
    let moveY = evt.pageY;
    let eleLeft = moveX - currentPoint.eleX;
    let eleTop = moveY - currentPoint.eleY;
    if (this.dragBox) {
      
      eleLeft = this.limitMove(eleLeft, eleTop).eleLeft;
      eleTop = this.limitMove(eleLeft, eleTop).eleTop;
    }

    style.left = eleLeft;
    style.top = eleTop;
    /**
     * 只能横向移动或者纵向移动
     */

    this.setState({ style: this.elementSport(style) });
  }

  elementSport(style) {
    let props = _.cloneDeep(this.state.props);
    style = _.cloneDeep(style);
    if(props.moveX) {
      delete style.top;
    }
    if(props.moveY) {
      delete style.left;
    }
    return style;
  }

  onMouseUp(evt) {
    if (!this.state.props.isUseH5Drag) {
      let props = _.cloneDeep(this.state.props);
      let { scrollLeft, scrollTop } = this.state.scrollDistance;
      let that = evt.target;
      let mousePoiner = this.state.mousePoiner;
      let style = _.cloneDeep(this.state.style);
      let pointer = { x: evt.pageX, y: evt.pageY };
      let location = { left: evt.target.getBoundingClientRect().left + scrollLeft, top: evt.target.getBoundingClientRect().top + scrollTop }
      
      if (props.minMoveDistance || props.maxMoveDistance) {
        let isPosition = this.moveDistance({ moveX: evt.pageX, moveY: evt.pageY });
        if (!isPosition) {
          style.left = mousePoiner.left;
          style.top = mousePoiner.top;
          style.transition = props.transition ? props.transition : "0.3s";
        }
      }
      window.removeEventListener("mousemove", this.mouseDragMove);
      window.removeEventListener("mouseup", this.onMouseUp);
      this.setState({ style },() => {
        this.props.onMouseUpPointer && this.props.onMouseUpPointer(pointer, location);
      });
    }
  }

  onDragStart(evt) {
    let props = _.cloneDeep(this.state.props);
    if (props.isUseH5Drag) {
      evt.dataTransfer.setData("Text", evt.target.id);
    }
  }

  render() {
    let { style, props } = this.state;
    return (
      <div style={style}
        id={this.id}
        draggable={props.isUseH5Drag}
        onDragStart={this.onDragStart}
        onMouseDown={this.onMouseDown}
        onMouseUp={this.onMouseUp}
        >
        {this.props.children}
      </div>
    )
  }
}

module.exports = DragEle;
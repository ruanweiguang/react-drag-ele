# React拖拽组件


* 安装

```javascript

npm install react-drag-ele --save-dev

```

* 单个功能如下

```html

import React, { Component } from 'react'
import ReactDOM from 'react-dom';
const Drag = require('react-drag-ele');
let DragEle = Drag.DragEle;
let DropTarget = Drag.DropTarget;
let DragBox = Drag.DragBox;
import './index.scss';
class App extends Component {

  constructor(props,context) {
    super(props,context);
    this.state = {
      style: {
        position: "absolute",
        fontSize: 30,
        width: 300,
        height: 230,
        background: "#dcdcdc",
        lineHeight: "230px",
        textAlign:"center"
      }
    }
    }
    
  componentDidMount() {
    
  }

  render() {
    let {style} = this.state;
    return (
      <div className="content">
        {/* <DragEle
          onMouseUpPointer={this.onMouseUpPointer.bind(this)}
          isUseH5Drag={false} //是否使用H5拖拽属性
          moveX={false} //只能在X轴移动
          moveY={false} //只能在Y轴移动
          minMoveDistance={228} //最小移动距离
          maxMoveDistance={456} //最大移动距离
        >
          <div style={this.state.style}>这个是拖拽组件1</div>
        </DragEle> */}
        <DragEle
          isUseH5Drag={true} //是否使用H5拖拽属性
          minMoveDistance={228} //最小移动距离
          transition="ease-in-out 0.5s" //transition默认动画ease 时间默认0.3秒
        >
          <div style={this.state.style}>这个是拖拽组件2</div>
        </DragEle>

        <DragBox className="drag-box">

          <DragEle minMoveDistance={228}><div style={this.state.style}></div></DragEle>
        </DragBox>
        <DragBox className="drag-box">
          <DragEle maxMoveDistance={456}><div style={this.state.style}></div></DragEle>
        </DragBox>

        {
          [1].map((item,index) => {
            return (
              <DropTarget
                onDropOverEle={this.onDropOverEle.bind(this)}
                key={index}>
                <div style={{ width: 300, height: 230, border: "1px solid red", float: "left" }}>
                </div>
              </DropTarget>
            )
          })
        }
      </div>
    )
  }
}
ReactDOM.render(<App /> ,"#main");

```
## 拖拽组件 <Drag>

```javascript
    const Drag = require('react-drag-ele');
    let DragEle = Drag.DragEle;
```


```html
<DragEle
  onMouseUpPointer={this.onMouseUpPointer.bind(this)}
  isUseH5Drag={false} //是否使用H5拖拽属性
  moveX={false} //只能在X轴移动
  moveY={false} //只能在Y轴移动
  minMoveDistance={228} //最小移动距离
  maxMoveDistance={456} //最大移动距离
>
  <div style={this.state.style}>这个是拖拽组件1</div>
</DragEle>
```

| 参数 | 说明 | 类型 | 默认值
- | : - : | - :
| onMouseUpPointer | 回调函数,(pointer,location) => {} pointer: 当前鼠标坐标点,location: 当前元素的位置| function |null |
|moveX| 只能在X轴移动 | Boolean | false |
|moveY| 只能在Y轴移动 | Boolean | false |
|minMoveDistance | 最小拖拽距离 | number | null |
|maxMoveDistance | 最大拖拽距离 | number | null |
|transition | 当设置了最小或最大移动距离属性，未达到该距离，回到原位置的过渡动画 | string | ease 0.3s |
|isUseH5Drag| 是否使用H5拖拽属性 | Boolean | false |
|关于style | 组件会直接使用div中的style,请直接传入style ,没有对ClassName做兼容|null| null |


## H5拖拽组件目标位置 DropTarget
```javascript
    const Drag = require('react-drag-ele');
    let DragEle = Drag.DragEle;
    let DropTarget = Drag.DropTarget;
```

```html
<DropTarget onDropOverEle={this.onDropOverEle.bind(this)}
 key={index}>
  <div style={{ width: 300, height: 230, border: "1px solid red", float: "left" }}>
  </div>
</DropTarget>
```

| 参数 | 说明 | 类型 | 默认值
- | : - : | - :
| onDropOverEle | 回调函数,(pointer,location) => {} pointer: 当前鼠标坐标点,location: 当前元素的位置 | function | null |


## 限制拖拽范围DragBox


```javascript
    const Drag = require('react-drag-ele');
    let DragEle = Drag.DragEle;
    let DragBox = Drag.DragBox;
```


```html
    <DragBox className="drag-box">
      <DragEle maxMoveDistance={456}><div style={this.state.style}></div></DragEle>
    </DragBox>
```



| 参数 | 说明 | 类型 | 默认值
- | : - : | - :
| className | 样式 | string | null |

在线演示demo ====================>
[在线demo](http://www.ruanweiguang.org)

# 保持更新，bug请留言。

# 欢迎star  



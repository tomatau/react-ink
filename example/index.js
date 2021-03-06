import React from 'react/addons'
import Ink   from '../src/index'

let Test = React.addons.TestUtils

React.initializeTouchEvents(true)

let Component = React.createClass({

  render() {
    return (
      <div>
        <h1>Click anywhere!</h1>
        <Ink ref="background" />
        <button style={{ position: 'relative' }} onClick={ this._onClick }>
          Toggle Stress Test
          <Ink key="__ink" />
        </button>
      </div>
    )
  },

  _onClick() {
    toggle()
  }

})

let playing = false
let component = React.render(<Component />, document.body)
let delta = Date.now()
let frame = null

function toggle() {
  if (playing) {
    cancelAnimationFrame(frame)
    playing = false
  } else {
    playing = true

    requestAnimationFrame(function click() {
      if (Date.now() - delta > 1000 / 12) {
        delta = Date.now()
        let dom = component.refs.background.getDOMNode()

        Test.Simulate.mouseDown(dom, {
          button: 0,
          clientX: Math.random() * window.innerWidth,
          clientY: Math.random() * window.innerHeight
        })

        Test.Simulate.mouseUp(dom)
      }
      frame = requestAnimationFrame(click)
    })
  }
}

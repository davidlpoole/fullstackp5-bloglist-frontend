import React, { useState } from 'react'

const Toggle = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <>
      <button style={hideWhenVisible} onClick={toggleVisibility}>{props.buttonShow}</button>
      <button style={showWhenVisible} onClick={toggleVisibility}>{props.buttonHide}</button>
      <div style={showWhenVisible}>
        {props.children}
      </div>
    </>
  )
}

export default Toggle
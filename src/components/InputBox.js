import React from 'react'

const InputBox = (props) => {
  return (
    <div>
      <label htmlFor={props.label}>{props.label}</label>
      <input type={props.type} value={props.value} onChange={props.onChange}></input>
    </div>
  )
}

export default InputBox
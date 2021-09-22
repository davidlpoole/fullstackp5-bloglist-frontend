import React from 'react'

const FormInput = (props) => {
  return (
    <div>
      <h2>{props.title}</h2>
      <form onSubmit={props.onSubmit}>
        <div>
          {props.children}
        </div>
        <button type="submit">{props.submitLabel}</button>
      </form>
    </div>
  )
}

export default FormInput
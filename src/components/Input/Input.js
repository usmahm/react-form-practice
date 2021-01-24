import React from 'react';

import styles from './Input.module.scss';

const Input = ({ elementType, elementConfig, value, changeHandler, isValid, touched, errorMessage }) => {
  let inputElement = null;
  
  let validationError = null;
  if (!isValid && touched) {
    validationError = <p className={`${styles.errorMessage}${!isValid && touched ? ` ${styles.show}` : null}`}>{errorMessage}</p>
  }

  switch (elementType) {
    case 'input': 
      inputElement = <input
        className={`${styles.input}${!isValid && touched ? ` ${styles.invalid}` : ''}`}
        {...elementConfig}
        value={value}
        onChange={changeHandler}
        />
      break
    default:
      throw new Error("Shouldn't be reached");
  }

  return (  
    <label>
      {inputElement}
      {validationError}
    </label>
  )
}

export default Input;
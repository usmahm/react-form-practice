import React, { useState } from 'react';
import Input from '../../components/Input/Input';
import styles from './Form.module.scss';

const Form = () => {
  const [signupElements, setSignupElements] = useState({
    firstName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'First Name'
      },
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: 'This field cannot be left empty'
    },
    lastName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Last Name'
      },
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: 'This field cannot be left empty'
    },
    userName: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Username'
      },
      value: '',
      valid: false,
      validation: {
        required: true,
        minLength: 3,
        maxLength: 7,
      },
      touched: false,
      errorMessage: "Length must be between 3 and 7 chars"
    },
    phoneNumber: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Phone Number'
      },
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: 'This field cannot be left empty'
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'mail',
        placeholder: 'Your Mail'
      },
      value: '',
      valid: false,
      validation: {
        required: true,
      },
      touched: false,
      errorMessage: 'This field cannot be left empty'
    },
    confirmMail: {
      elementType: 'input',
      elementConfig: {
        type: 'mail',
        placeholder: 'Confirm Mail'
      },
      value: '',
      valid: false,
      validation: {
        required: true,
        equalsMail: true
      },
      touched: false,
      errorMessage: "Must be the same as email"
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      valid: false,
      validation: {
        required: true,
        minLength: 8
      },
      touched: false,
      errorMessage: "Password Length can't be less than 8 chars"
    },
    confirmPassword: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Confirm Password',
      },
      value: '',
      valid: false,
      validation: {
        required: true,
        equalsPassword: true
      },
      touched: false,
      errorMessage: "Must be the same as email"
    },
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const checkValidity = (value, rules) => {
    let isValid = true
    
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.equalsPassword) {
      isValid = value === signupElements.password.value && isValid;
    }

    if (rules.equalsMail) {
      isValid = value === signupElements.email.value && isValid;
    }

    return isValid
  }

  const inputChangeHandler = (event, inputIdentifier) => {
    const newValue = event.target.value;
    const updatedElements = { 
      ...signupElements,
      [inputIdentifier]: {
        ...signupElements[inputIdentifier],
        value: newValue,
        touched: true,
        valid: checkValidity(newValue, signupElements[inputIdentifier].validation),
      } 
    };

    let isFormValid = true;
    for (let inputIdentifier in signupElements) {
      isFormValid = updatedElements[inputIdentifier].valid && isFormValid;
    }

    setSignupElements(updatedElements);
    setFormIsValid(isFormValid);
  }

  let signupElementsArray = [];
  for (let key in signupElements) {
    signupElementsArray.push({
      id: key,
      config: signupElements[key]
    })
  };

  console.log(formIsValid);

  return (
    <div className={styles.form}>
        <h1>Sign up with E-mail</h1>
        <form>
          {signupElementsArray.map(el => (
            <Input 
              key={el.id}
              elementType={el.config.elementType} 
              elementConfig={el.config.elementConfig} 
              value={el.config.value} 
              changeHandler={(event) => inputChangeHandler(event, el.id)} 
              isValid={el.config.valid}
              touched={el.config.touched}
              errorMessage={el.config.errorMessage}
            />))}
            <button type="submit" disabled={!formIsValid}>Submit</button>
        </form>
    </div>
  )
}

export default Form;
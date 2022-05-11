import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// Reducer 함수를 컴포넌트 함수 바깥으로 꺼낸 이유는
// 리듀서 함수 내부에서는 컴포넌트 함수 내부에서 생성된
// 어떠한 데이터도 필요하지 않기 때문이다.
const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  }
  if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }
  return {
    value: '',
    isValid: false,
  };
};

const passwordReducer = (state,action) => {
  if (action.type === 'USER_INPUT'){
    return {value: action.val, isValid: action.val.trim().length > 6}
  }
  if (action.type === 'INPUT_BLUR') {
    return {value: state.value, isValid: state.value.trim().length > 6}
  }
  return {
    value: '',
    isValid: false,
  }
}


const Login = (props) => {

  const [formIsValid, setFormIsValid] = useState(false);
  // [state snapshot , action dispatch(reducerFn - 최신 state snapshot을 가져옴)]
  // useReducer(reducerFn, initalState, initFn)
  // reducerFn(state,action)
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer,{
    value: '',
    isValid: null
  })

  // useEffect를 정확하게 동작시키기 위해 
  // Destructuring으로 isValid 값만 추출한다.
  const {isValid: emailIsValid} = emailState;
  const {isValid: passwordIsValid} = passwordState;
   



  useEffect(()=>{
    const identifier = setTimeout(()=> {
      console.log('useEffect - form validation')
      setFormIsValid(
        emailIsValid && passwordIsValid
      )
    },500)
    return () => {
      console.log('clean up function 2번째 side effect실행 전 또는 컴포넌트 제거 전 실행')
      clearTimeout(identifier);
    }
    //의존성 배열에 desctructuring으로 isValid 값을 빼내와서
    //value 값이 바뀔때마다 계속 실행되는 것을 막는다.
  },[emailIsValid,passwordIsValid])


  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({type: 'USER_INPUT', val:event.target.value})
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPassword({type:'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

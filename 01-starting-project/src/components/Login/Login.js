import React, { useState,useEffect } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);





  useEffect(()=>{
    console.log('Effect Running')
  })















  // useEffect의 본질은 Side Effect의 관리다.
  // side Effect는 보통 http Request이다.
  // 키 입력을 듣고 입력된 데이터를 저장하는 것도 Side Effect이다. 
  // 그에 대한 응답으로 다른 Action을 실행하는 것도 side Effect이다.
  // 아래 useEffect에 담긴 Action은 이메일/비밀번호 필드에서 입력되는 값을 보고
  // 입력되는 값에 대한 응답으로 해당 폼의 유효성을 검사하고 업데이트 하는 것 또한
  // 사용자가 입력한 데이터에 관련된, UI와 관계 없는 Side Effect이다.
  // 중요한 점은 어떤 Action에 대한 응답으로 실행되는 Action이 있다면
  // 그것이 Side Effect라는 점이다.
  useEffect(()=>{
    // 단축평가로 값을 반환 - 조건에 부합하면 truthyh로 변경.
    // useEffect 바깥으로 setFormIsValid를 꺼내놓는다면 
    // formIsValid가 변경되면서 컴포넌트를 다시 랜더링하고
    // 코드는 컴포넌트가 다시 렌더링 될 때마다 재실행되며 무한 loop에 빠지게 된다.
    const identifier = setTimeout(()=>{
      // 연속적으로 타이핑을 칠 때마다 setFormIsValid가 실행되는 것을 방지하기 위해 setTimeOut으로 묶는다
      setFormIsValid(enteredEmail.includes('@') && enteredPassword.trim().length > 6);
    },500)
    

    // clean-up function
    // 첫 번째 SideEffect 함수가 실행되기 전에는 실행되지 않으며,
    // 2번째 side Effect 함수가 실행되기 전에, 그리고 컴포넌트가 제거되기 전에 실행된다.
    // clean-up function을 통해 두 번째 side Effect가 실행되기 전에 setTimeout을 삭제한다.
    return () => {
      clearTimeout(identifier);
    };

    //의존성 배열에 값을 추가하면 마지막 컴포넌트 랜더링 주기에서 해당 값이 변경된 경우에만 실행하라는 뜻이다.
    // setFormIsValid는 의존성 배열에 입력하지 않아도 되는데,
    // state를 업데이트하는 함수는 기본적으로 리엑트에 의해 절대 변경되지 않도록 보장하기 때문이다.
  },[enteredEmail,enteredPassword])

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    
 
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    
    
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          {/* disabled={!formIsValid}는 현재 formIsValid값이 false이기때문에 disabled={true}인 상태. */}
          {/* formIsValid 조건이 충족된다면 disabled={false}로 잠김이 해제 된다. */}
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

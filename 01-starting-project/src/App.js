import React, { useState,useEffect } from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  //UseEffect는 모든 컴포넌트가 평가가 끝난 뒤에 (또는 재평가 뒤에) 실행된다.
  // Date를 가져오는 행위는 Side Effect이다.
  // 물론 데이터를 가져온 후 화면을 랜더하기에 결과는 UI와 관련이 있겠지만
  // 데이터에 접근한다는 것은 UI와 관련 없는 Side Effect이기 떄문에 useEffect로 관리해야 한다.
  useEffect(()=>{
    const storedUserLoggedInInfomation = localStorage.getItem('isLoggedIn');
  // storedUserLoggedInInfomation가 true라면(저장되어 있다면) setIsLoggedIn을 true로 설정한다.
  // 그리고 state 설정 함수를 호출할 때마다 App Component는 다시 실행된다.
  // App component가 다시 실행되면서 if문이 재실행된다.
    if(storedUserLoggedInInfomation === '1'){
      setIsLoggedIn(true);
    }
    // 의존성이 변경될때마다 useEffect가 실행된다.
    // 앱을 처음 시작할 때에는 의존성이 변경된 것으로 간주된다.
    // 이후에는 의존성 배열 내 값이 변경되지 않기에 (변경될 것이 없기 때문에) 실행되지 않는다.
  },[])




  const loginHandler = (email, password) => {
    localStorage.setItem('isLoggedIn','1');
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  return (
    <React.Fragment>
      <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
      <main>
        {!isLoggedIn && <Login onLogin={loginHandler} />}
        {isLoggedIn && <Home onLogout={logoutHandler} />}
      </main>
    </React.Fragment>
  );
}

export default App;

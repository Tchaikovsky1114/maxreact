import React from 'react'

const DemoOutput = (props) => {
  // DemoOutput 내에서 변경이 일어나도, App Component 전체가 다시 재평가된다.
  // DemoOutput의 state를 App Component가 관리하고 있기 때문이다.
  // state, props,context가 변경되면 컴포넌트는 재실행, 재평가 되기 때문이다.
  console.log('DemoOutput Running');
  return <p>{props.show ? 'this is new' : ''}</p>
}


export default DemoOutput
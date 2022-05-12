import React, {useState} from 'react';
import Button from './components/UI/Button/Button'
import './App.css';
import DemoOutput from './components/UI/Button/Demo/DemoOutput';

function App() {
  //리액트는 State,Props,Context의 변경시에 함수를 재실행하고 재평가한다.
  // 컨텍스트 안에서도 내부적으로 state를 사용하므로 컨텍스트를 통해 값이 변경될수있다
  // props는 부모에서 자식 컴포넌트로 향한다
  // 그러면 props를 통해 넘겨받은 값은 언제 바뀔까?
  // 최종적으로 원리를 생각해보면 부모의 상태가 다른 상태로 바뀔때만 바뀐다.
  const [showParagraph, setShowParagraph] = useState(false);


  // 컴포넌트 전체가 재실행되고, 재평가되기에
  // 버튼을 클릭할 때 마다 리액트가 console.log를 실행한다.
  console.log('App Running');
  const toggleParagraphHandler = () => {
    setShowParagraph(prev => !prev);
  }
  // render는 JSX 함수 호출과 같다.
  // Component 함수를 호출하여 실행한다는 것은
  // DemoOutput , Button component도 역시 다시 실행되고 재평가된다.
  // 부모 컴포넌트가 변경되었고 자식 컴포넌트는 부모 컴포넌트의 일부이기 때문이다.
  // 부모 컴포넌트가 변경되면 자식 컴포넌트도 변경되는 것이다.
  // props의 전달과는 상관 없이 이뤄진다.
  // 물론 DemoOutput이 재실행된다고 해서 실제 DOM이 변경된다는 것은 아니다.(랜더링된다는 것은 아니다)
  // 단지 컴포넌트의 재평가와 컴포넌트의 함수 재실행이 일어나는 것이고
  // 이는 실제 DOM이 다시 렌더링되거나 변경되는 것 아니기 때문이다.
  return (
    //  첫번째 랜더링을 하면서, 리액튼느 div와 h1 button이 필요하다는 것을 알게 된다.
    // paragraph는 처음에 표시되지 않게 해놨기 때문에 첫 랜더링에서는 paragraph를 고려하지 않는다.
    // 그리고 마지막 출력을 확인한다.
    // 컴포넌트 첫 랜더링 이후 이전 스냅샷은 존재하지 않기에 차이점을 비교하는 과정에서
    // div, H1 button이 다시 랜더링 된다.
    // 그리고 이 정보가 리액트 DOM Package로 전달되어 화면에 렌더링 결과가 표시된다.
    // 실제 DOM을 통한 업데이트는 가상 snapshot 간의 "차이점만 반영된다."
    

    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={false}/>
      <Button onClick={toggleParagraphHandler}>Toggle Paragraph</Button>
    </div>
  );
}

export default App;

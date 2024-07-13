import React, { useContext } from 'react';
import { TabContext } from './TabContext';
import Component1 from './Component1';
import Component2 from './Component2';
import Component3 from './Component3';
import Component4 from './Component4';
import Register from './Register';
import Login from './LogIn';
import '../index.css';

function TabContent() {
  const { selectedTopic, isLoggedIn, setIsLoggedIn, setSelectedTopic, isNewUser } = useContext(TabContext);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsNewUser(false);
    setSelectedTopic('login');
  };

  if (!isLoggedIn) {
    return <Login />;
  }

  let content;
  switch (selectedTopic) {
    case 'login':
      content = <Login />;
      break;
    case 'register':
      content = <Register />;
      break;
    case 'component1':
      content = <Component1 />;
      break;
    case 'component2':
      content = <Component2 />;
      break;
    case 'component3':
      content = <Component3 />;
      break;
    case 'component4':
      content = <Component4 />;
      break;
    default:
      content = <p>Welcome! Please select a component from the header.</p>;
  }

  return (
    <div>
      {content}
      <button id='logoutbtn' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default TabContent;

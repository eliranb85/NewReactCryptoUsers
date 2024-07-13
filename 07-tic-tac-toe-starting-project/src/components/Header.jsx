// Header.jsx
import React, { useContext } from 'react';
import { TabContext } from './TabContext';
import TabButton from './TabButton';  // Assuming you have this component
import '../index.css'


function Header() {
  const { selectedTopic, setSelectedTopic } = useContext(TabContext);

  const handleSelect = (topic) => {
    setSelectedTopic(topic);
  };

  return (
    <header>
      <nav>

        <ul id="mainmenu" className='raw'>
          <li id="list">
            <TabButton 
              isSelected={selectedTopic === 'component1'} 
              onClick={() => handleSelect('component1')}
            >
              All Cryptocurrencies
            </TabButton>
          </li>
          <li id="list">
        <TabButton 
        isSelected={selectedTopic=='register'}
        onClick={()=>handleSelect('register')}
        >
          Register

        </TabButton>
        </li>
          <li id="list">
            <TabButton 
              isSelected={selectedTopic === 'component2'} 
              onClick={() => handleSelect('component2')}
            >
              Crypto Market Analysis
            </TabButton>
          </li>
          <li id="list">
            <TabButton 
              isSelected={selectedTopic === 'component3'} 
              onClick={() => handleSelect('component3')}
            >
All Users            </TabButton>
          </li>
          <li id="list">
            <TabButton 
              isSelected={selectedTopic === 'component4'} 
              onClick={() => handleSelect('component4')}
            >
              component 4
            </TabButton>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
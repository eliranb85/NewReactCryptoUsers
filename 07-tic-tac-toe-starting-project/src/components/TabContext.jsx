import React, { createContext, useState } from 'react';

export const TabContext = createContext();

export function TabProvider({ children }) {
  const [selectedTopic, setSelectedTopic] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isNewUser, setIsNewUser] = useState(false);

  return (
    <TabContext.Provider value={{ selectedTopic, setSelectedTopic, isLoggedIn, setIsLoggedIn, isNewUser, setIsNewUser }}>
      {children}
    </TabContext.Provider>
  );
}

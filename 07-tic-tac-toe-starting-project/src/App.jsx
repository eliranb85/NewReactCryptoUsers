import React, { useContext } from 'react';
import Header from './components/Header';
import TabContent from './components/TabContent';
import { TabContext, TabProvider } from './components/TabContext';

function AppContent() {
  const { isLoggedIn } = useContext(TabContext);

  return (
    <div>
      {isLoggedIn && <Header />}
      <TabContent />
    </div>
  );
}

function App() {
  return (
    <TabProvider>
      <AppContent />
    </TabProvider>
  );
}

export default App;

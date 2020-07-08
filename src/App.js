import React from 'react';
import Navbar from './components/navigation/Navbar';
import Sidebar from './components/navigation/Sidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ItemsDashboard from './components/app/Dashboard/ItemsDashboard';
import { GlobalStateContextProvider } from './contexts/GlobalStateContext';
import EditItemModal from './components/app/EditItems/EditItemModal';
import Trash from './components/app/Trash/Trash';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <GlobalStateContextProvider>
                    <Navbar />
                    <Sidebar />
                    <EditItemModal />
                    <Switch>
                        <Route exact path='/' component={ItemsDashboard} />
                        <Route exact path='/trash' component={Trash} />
                    </Switch>
                </GlobalStateContextProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;

import React from 'react';
import Navbar from './components/navigation/Navbar';
import Sidebar from './components/navigation/Sidebar';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { GlobalStateContextProvider } from './contexts/GlobalStateContext';
import AreYouLost from './components/navigation/AreYouLost';
import BottomMenu from './components/navigation/BottomMenu';

const EditItemModal = React.lazy(() => import('./components/app/EditItems/EditItemModal'));
const ItemsDashboard = React.lazy(() => import('./components/app/Dashboard/ItemsDashboard'));
const Trash = React.lazy(() => import('./components/app/Trash/Trash'));


function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <GlobalStateContextProvider>
                    <Navbar />
                    <Sidebar />
                    <BottomMenu />
                    <React.Suspense fallback={<div></div>}>
                        <EditItemModal />
                    </React.Suspense>
                    <Switch>
                        <Route exact path='/' >
                            <React.Suspense fallback={<div></div>}>
                                <ItemsDashboard />
                            </React.Suspense>
                        </Route>
                        <Route exact path='/trash' >
                            <React.Suspense fallback={<div></div>}>
                                <Trash />
                            </React.Suspense>
                        </Route>
                        <Route path='*' component={AreYouLost} />
                    </Switch>
                </GlobalStateContextProvider>
            </div>
        </BrowserRouter>
    );
}

export default App;

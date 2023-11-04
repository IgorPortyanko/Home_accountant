import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout';
import IncomePage from './components/main/IncomePage';
import ExpensesPage from './components/main/ExpensesPage';
import AllTransaction from './components/main/AllTransaction';

function App() {
  return (
    <div className="App">
        <Routes>
            <Route path='/' element={ <Layout/> }>
              {/* <Route index path='allTransaction' element={ <AllTransaction/> }/> */}
              <Route index path='/' element={ <AllTransaction/> }/>
              <Route path='income' element={ <IncomePage/> }/>
              <Route path='expense' element={ <ExpensesPage/> }/>
            </Route>
        </Routes>

    </div>
  );
}

export default App;

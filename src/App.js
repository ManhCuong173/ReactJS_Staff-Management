import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Employee from './features/pages/Employee';
import * as sampleData from './data.json';
function getSampleData () {
  const sampleDataFromLC = localStorage.getItem ('sampleData');
  if (sampleDataFromLC) return;
  localStorage.setItem ('sampleData', JSON.stringify (sampleData));
}

function App () {
  useEffect (() => {
    getSampleData ();
  }, []);
  return (
    <div className="App">
      <Employee />
    </div>
  );
}

export default App;

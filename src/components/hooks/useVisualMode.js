import {useState} from 'react';

const useVisualMode = function (initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]); 

  const transition = (new_mode, replace = false) => {
    setMode(new_mode);
    setHistory(prev => {
      const new_history = replace ? (prev.slice(0, prev.length - 1)).concat([new_mode]) : [...prev, new_mode];
      return new_history;
    });
  }
  const back = () => {
    //new_history pops the latest mode from array, since we are going back
    let new_history = history.length === 1 ? history : history.splice(0, history.length - 1);
    //set mode to the previous mode according to history
    setMode(new_history[new_history.length - 1]);
    //update history
    setHistory(new_history);
  };


  return { mode, transition, back };

}

export default useVisualMode;
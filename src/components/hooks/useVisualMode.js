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
    setHistory(prev => {
      const new_history = [...prev];
      if (new_history.length > 1) new_history.pop();
      setMode(new_history[new_history.length - 1]);
      return new_history
    });
  };


  return { mode, transition, back };

}

export default useVisualMode;
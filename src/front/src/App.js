import axios from 'axios';
import React, { useState } from 'react';

import FormApp from './FormApp';
import ResultApp from './ResultApp';
import './App.css';


function App(props) {

  const [state, setState] = useState({
    url: '',
    type: 0,
    grouping: 5,
    chars: []
  });

  const form_func = {
    update_value: (e) => {
      form_func.change_state(e.target.name, e.target.value);
    },
    make_result: () => {
      axios.get(`/api/crawl?url=${state.url}&type=${state.type}`)
        .then((result) => {
          let data = result.data;
          form_func.change_state('chars', data.counted);
        })
        .catch((e) => { 
          console.log(e);
          alert('오류 발생');
          form_func.change_state('chars', []);
        });
    },
    change_state: (name, value) => {
      let new_state = { ...state };
      new_state[name] = value;
      setState(new_state);
    }
  };

  return (
    <div className="App">
      <FormApp func={form_func} {...state} />
      <ResultApp chars={state.chars} grouping={state.grouping} />
    </div>
  );
}

export default App;

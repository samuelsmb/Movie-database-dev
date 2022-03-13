import React, { useState } from 'react';
import axios from 'axios';

//import Result from './components/Result';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { green, purple, common, lightBlue } from '@mui/material/colors';
import { lightBlue } from '@mui/material/colors';

import Cards from './components/cards/Cards';


function App() {

  const apiurl = process.env.REACT_APP_API

  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });

  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: lightBlue[500],
      },
      secondary: {
        main: lightBlue[500],
      },
    },
  })

  const search = (e) => {
   
    if (e.key === "Enter") {
      try {
        // console.log(state.s);
        // console.log(state.s.trim().length);
        axios(apiurl + "&s=" + state.s).then(({ data }) => {
          let results = data.Search;

          // console.log(results)

          setState(prevState => {
            return { ...prevState, results: results }
          });
        });
      } catch (error) {
        console.error(error)

      }
    }
  }

  const handleInput = (e) => {
    e.preventDefault()
    let s = e.target.value;
    if (s === "") {
      return;
    }

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }
  

  return (
    <div className="App">
      
      <header>
       <h1>A movie database</h1>
       <h4>By Abstract </h4>
      </header>

      <main>
        <ThemeProvider theme={theme}>
          <Box sx={{ m:5 }}>
            <TextField 
              id="standard-basic" 
              onChange={handleInput} 
              onKeyPress={search} 
              label="Search for a movie..." 
              variant="filled"  
              sx={{ width:"100%", background:"rgba(0,0,0,0.6)" }} />
          </Box>
        </ThemeProvider>

        {
          (typeof state.results !== "undefined") ? <Cards results={state.results}/> : false
        }

      </main>
    </div>
  );
}

export default App;
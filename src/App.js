import logo from './logo.svg';
import './App.css';
import TodoList from './components/TodoList'
import Checkbox from "@mui/material/Checkbox";
import { DataGrid } from "@mui/x-data-grid";
import { useDemoData } from "@mui/x-data-grid-generator";
import { StyledEngineProvider } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { Height, Radio } from '@mui/icons-material';
import Grid from './components/Grid';
import WeddingGifftReactApp from './components/WeddingGiftReactApp';
import LuckyDrawAnimation from './components/LuckyDrawAnimation';
import FireworksBackground from './components/FireworksBackground ';



const MyCustomColumnMenu = React.forwardRef(({ test, ...props }, ref) => {
  
  useEffect(()=>{
    console.log("tes", test())
  })
  return (
    <div className='test-div'>
      <Checkbox color='error' className='test' id="inside-check" {...props} />
    </div>
  );
});

function App() {
  console.log("This is a log from App component");

  const [showWeddingGift, setShowWeddingGift] = useState(false);
  const [funnyimage, setFunnyImage] = useState(false);

  const onLuckyDrawClose = () => {
    // setShowWeddingGift(true);
    setFunnyImage(true);
  }

  useEffect(()=>{
    if(funnyimage){
      setTimeout(()=> {
        setFunnyImage(false);
        setShowWeddingGift(true);
      }, 1000)
    }
  },[funnyimage])
  return (
    <div className="App">
      <LuckyDrawAnimation onClose={onLuckyDrawClose} />
      {funnyimage && <img src='/images/funny_image.jpg' style={{width: '100%', height: '100%'}}/>}
      {showWeddingGift && <WeddingGifftReactApp />}
    </div>
  );
}

export default App;

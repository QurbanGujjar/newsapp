import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React,{useEffect,useState} from 'react';

import NavBar from "./Components/NavBar";
import News from "./Components/News";
import LoadingBar from 'react-top-loading-bar'
let c=0

// let pageSize=window.innerWidth
let pageSize=1
function App(){
  var w = window.innerWidth;


  // let pageSize=4/
  // const [pageSize, setPageSize] = useState(4);
// const [windowSize, setwindowSize] = useState(w);
//   useEffect(()=>{
//     setwindowSize(window.innerWidth)
//     if(w<500){
//       console.log(' case 1')
//       setPageSize(1)
//     }
//     else if(w>500 && w<780){
//       console.log(' case 2')
//       setPageSize(2)
//     }
//     else if(w>780 && w<1100){
//       console.log(' case 3')
//       setPageSize(3)
//     }
//     else{
//       console.log(' case 4')
//       setPageSize(4)
//     }
//   },[windowSize])
function getPageSize(){
  // setwindowSize(window.innerWidth)
      if(w<500){
        // console.log(' case 1')
         pageSize=1
      }
      else if(w>500 && w<780){
        // console.log(' case 2')
        pageSize=2
      }
      else if(w>780 && w<1100){
        // console.log(' case 3')
       pageSize=3
      }
      else{
        // console.log(' case 4')
         pageSize=4
      }

}
getPageSize()
// console.log(pageSize)
const [process,setProgress]=useState(10)
// state={
// process:0
// }
// setProgress =(progress)=>{
//   this.useState({progress:progress})
// }
// const APIKEY=process.env.REACT_APP_APIKEY

// console.log(APIKEY)
let APIKEY="e05d29ef062b422382408a87fbd94e55"
  return (
    <Router>
       <NavBar/>
       <LoadingBar
        color='#f11946'
        progress={process}

      />
    <Routes>

      <Route exact path='/' element={<News setProgress={setProgress} APIKEY={APIKEY} key="general" pageSize={pageSize} country={'us'} category={'general'}/>} />
      <Route exact path='/general' element={<News setProgress={setProgress} APIKEY={APIKEY} key="general1" pageSize={pageSize} country={'us'} category={'general'}/>} />
      <Route exact path='/business' element={<News setProgress={setProgress} APIKEY={APIKEY} key="business" pageSize={pageSize} country={'us'} category={'business'}/>} />
      <Route exact path='/entertainment' element={<News setProgress={setProgress} APIKEY={APIKEY} key="entertainment" pageSize={pageSize} country={'us'} category={'entertainment'}/>} />
      <Route exact path='/health' element={<News setProgress={setProgress} APIKEY={APIKEY} key="health" pageSize={pageSize} country={'us'} category={'health'}/>} />
      <Route exact path='/science' element={<News setProgress={setProgress} APIKEY={APIKEY} key="science" pageSize={pageSize} country={'us'} category={'science'}/>} />
      <Route exact path='/sports' element={<News setProgress={setProgress} APIKEY={APIKEY} key="sports" pageSize={pageSize} country={'us'} category={'sports'}/>} />
      <Route exact path='/technology' element={<News setProgress={setProgress} APIKEY={APIKEY} key="technology" pageSize={ pageSize} country={'us'} category={'technology'}/>} />

    </Routes>
    </Router>

  );
}

export default App;



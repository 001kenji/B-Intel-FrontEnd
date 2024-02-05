import { useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Logger from './JSX/logger'
import Dashboard from './JSX/dashboard'
import { HashRouter, Routes, Route  } from "react-router-dom";


function App(props) {
  const referencer = useRef();
  
 const [IsVerified, setIsverified] = useState(false)
 const [ProfileInfo, setProfileInfo] = useState({})

 function FuncVerify(props){
  setIsverified((c) => !c)
  setProfileInfo(props)
 }
 function PassProfile(props){
  detail = {
    'name' :'test'
  }
 }

  return (
    <>
    
     <HashRouter>
      <Routes>
        { IsVerified ?
          <Route path='/'  element={<Dashboard profile={ProfileInfo} />}>

        
        </Route>
        :
        <Route path='/' index element={<Logger verify={FuncVerify} />}>

        </Route>
      }


      </Routes>
    </HashRouter>
    </>
  )
}

export default App
 
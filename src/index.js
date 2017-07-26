//========================================================
//My reads: book tracking application 
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//Main module of the application; renders the root component. 
//========================================================================================

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'


ReactDOM.render(
<BrowserRouter><App /></BrowserRouter>
,
 document.getElementById('root'))

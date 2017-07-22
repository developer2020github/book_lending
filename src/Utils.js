//========================================================
//My reads: book tracking application 
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This module contains generic functions that could be used by several components 
//and do not really belong to a specific component. 
//========================================================================================

import * as Constants from './Constants'

//check if shelf is a valid one 
function isValidShelf(shelf){
	return Object.values(Constants.SHELVES).indexOf(shelf) > -1
}

export {isValidShelf}; 
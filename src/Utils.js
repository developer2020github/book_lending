import * as Constants from './Constants'

//check if shelf is a valid one 
function isValidShelf(shelf){
	return Object.values(Constants.SHELVES).indexOf(shelf) > -1
}

export {isValidShelf}; 
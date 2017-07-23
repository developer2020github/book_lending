//========================================================
//My reads: book tracking application 
//2017
//Author:  developer2020 
//e-mail:  dev276236@gmail.com
//========================================================

//========================================================================================
//This module contains definitions of constants used across the application. 
//========================================================================================

const SHELVES = {
	WANT_TO_READ: 'wantToRead', 
	CURRENTLY_READING: "currentlyReading", 
	READ: "read", 
	NONE: "none"
}

const SHELF_NAMES = {
	[SHELVES.WANT_TO_READ] : 'Want to Read', 
	[SHELVES.CURRENTLY_READING] : 'Currently Reading', 
	[SHELVES.READ] : 'Read',
	[SHELVES.NONE] : 'None'
}

export {SHELVES}; 
export {SHELF_NAMES}; 
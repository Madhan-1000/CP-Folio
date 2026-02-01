//-------------------------------------------------
//-------------------------------------------------
//This function is to get the json data from the user
//Then take the name and place it in the title 
fetch("../data/config.json")
.then(res=>res.json())
.then(
    config=>{
        document.title=`${config.name}|CP-Folio`
    }
);
//-------------------------------------------------
//-------------------------------------------------

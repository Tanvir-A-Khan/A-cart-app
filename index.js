
// some important imports for working with fire base
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from 
"https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-73d39-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "movies")

// automatically calls whenever runs
// fetch values from the database
onValue(moviesInDB, function(snapshot){
    if(snapshot.exists()){
        // getting the values from the object snapshot.val()
        const booksA = Object.entries(snapshot.val())
        
        // making the list empty
        unorderList.innerHTML = ""
        
        /// appending each id to the html using dom
        booksA.forEach((item)=>{  
            let newEl = document.createElement('li')
            newEl.innerHTML = item[1]
            newEl.addEventListener('click', function(){
    
                removeFromDB(item[0])
            })
    
            unorderList.append(newEl)
            
        })
    }else{
        
        unorderList.innerHTML = "<li>No items here .... </li>"
    }

})


function removeFromDB(item){

    const g = ref(database,`movies/${item}`);
    remove(g)
    
}

// console.log(app);


/// grabbing the related components
const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const unorderList = document.getElementById("shoppingCart")


addButtonEl.addEventListener("click", function(){

    const inputValue = inputFieldEl.value;

    if(inputValue != ""){
        push(moviesInDB, inputValue)
    }
    inputFieldEl.value = ""

})

function appendItems(item){
    unorderList.innerHTML += `<li>${item}</li>`
}
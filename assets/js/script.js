const addInput = document.getElementById("AddInput");
const addButton = document.getElementById("AddButton");
const mainContainer = document.getElementById("mainContainer")
let addInputValue = "";
addInput.addEventListener("keyup",function (evt) {
    addInputValue = evt.target.value; 
    return addInputValue;   
});

addButton.addEventListener("click",function(evt) {
    evt.preventDefault()
    addCommentFunc()
   
});


function addCommentFunc () {
   
    const addDiv = document.createElement("div");
    addDiv.className = "AddDiv";
    addDiv.innerText = addInputValue;
    document.getElementById("mainContainer").appendChild(addDiv);
    
    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete"
    deleteButton.className = "deleteButton";
    addDiv.appendChild(deleteButton);
    
}



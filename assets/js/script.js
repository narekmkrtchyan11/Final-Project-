const addInput = document.getElementById("AddInput");
const addButton = document.getElementById("AddButton");
const mainContainer = document.getElementById("mainContainer")
const addCommentDiv = document.getElementById("addCommentDiv")
const deleteCommentDiv = document.getElementById("deleteCommentDiv");
const bal = document.getElementById("bal");
let addInputValue = "";


addCommentDiv.addEventListener("click",function(){
    mainContainer.style.display = "block";
})

deleteCommentDiv.addEventListener("click",function(){
    mainContainer.style.display = "none";
})

addInput.addEventListener("keyup",function (evt) {
    addInputValue = evt.target.value;
    addInputValue.length < 10; 
    return addInputValue;   
});

addInput.addEventListener("click",function (evt) {
    evt.stopPropagation()
    addInput.placeholder = addInput.placeholder === "Comment"?"Please write your comment ...":"Comment";
})

mainContainer.addEventListener("click",function(evt){
    addInput.placeholder = "Comment";
})

addButton.addEventListener("click",function(evt) {
    evt.preventDefault()

    if(addInput.value !== ""){
        addCommentFunc();
    }
    
});


function addCommentFunc () {
   
    const addDiv = document.createElement("div");
    addDiv.className = "AddDiv";
    
    document.getElementById("mainContainer").appendChild(addDiv);
    addInputValue.value = "";
    const addText = document.createElement("h4");
    addText.className = "h4";
    addDiv.appendChild(addText);
    addText.innerHTML = addInputValue;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "deleteButton";
    addDiv.appendChild(deleteButton);


    const replyButton = document.createElement("button");
    replyButton.innerHTML = "Reply";
    replyButton.className = "replyButton";
    addDiv.appendChild(replyButton); 

    addInput.value = "";

    deleteButton.addEventListener("click",function(evt) {
        document.getElementById("mainContainer").removeChild(addDiv);
    })
    let f = 0;
    replyButton.addEventListener("click",function(){
        
        if(f === 0){
        f++;
        const replyDiv = document.createElement("div");
        replyDiv.className = "replyDiv"
        const textArea = document.createElement("textarea");
        textArea.maxLength = "70";
        textArea.className = "textArea"
        const addReplyCommentButton = document.createElement("button");
        addReplyCommentButton.className = "addReplyCommentButton";
        addReplyCommentButton.innerText = "Add";
        const deleteReplyCommentButton = document.createElement("button");
        deleteReplyCommentButton.innerText = "Delete";
        deleteReplyCommentButton.className = "deleteReplyCommentButton";
        replyDiv.appendChild(deleteReplyCommentButton);
        addDiv.appendChild(replyDiv);
        replyDiv.appendChild(textArea);
        replyDiv.appendChild(addReplyCommentButton);
        textArea.placeholder = "Reply Comment";
        let textAreaValue = "";

        textArea.addEventListener("keyup",function(evt){
            textAreaValue = evt.target.value; 
            return textAreaValue;
        })
        
        addReplyCommentButton.addEventListener("click",function(evt){
            evt.stopPropagation()
            if(textArea.value !== ""){
                evt.preventDefault();
                const replyCommentDiv = document.createElement("div");
                replyCommentDiv.className = "replyCommentDiv";
                replyCommentDiv.innerText = textAreaValue;
                addDiv.appendChild(replyCommentDiv);
                textArea.value = "";

                deleteReplyCommentButton.addEventListener("click",function(evt){
                    evt.preventDefault()
                    replyCommentDiv.parentElement.removeChild(replyCommentDiv);  
                })
        }});
        
    }})
    
}

let a = 5;
let span = document.createElement("span");
span.innerHTML = `${a}`;
bal.appendChild(span);

const arrowUp = document.getElementById("arrowUp");
const arrowDown = document.getElementById("arrowDown");
arrowUp.addEventListener("click",function(){
    if(a < 10 && a >= 0){
        a++;
        span.innerHTML = `${a}`;
        }
})

arrowDown.addEventListener("click",function(){
    if(a<= 10 && a> 0){
    a--;
    span.innerHTML = `${a}`;
    }
})



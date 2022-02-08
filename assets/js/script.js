










const posts = document.getElementsByClassName("post");



for (const post of posts) {
const addButton = post.getElementsByClassName("AddButton")[0];
const mainContainer = post.getElementsByClassName("mainContainer")[0];
const addCommentDiv = post.getElementsByClassName("addCommentDiv")[0];
const deleteCommentDiv = post.getElementsByClassName("deleteCommentDiv")[0];
const bal = post.getElementsByClassName("bal")[0];



addCommentDiv.addEventListener("click",function(){
    mainContainer.style.display = "block";
})

deleteCommentDiv.addEventListener("click",function(){
    mainContainer.style.display = "none";
})



addButton.addEventListener("click",function(evt) {
    evt.preventDefault();
    const textArea1 = evt.target.previousElementSibling;
    const comment = textArea1.value;

    
    if(comment !== ""){
        addCommentFunc(comment,textArea1);
    }
    
});


function addCommentFunc (value,textArea1) {
   
    const addDiv = document.createElement("div");
    addDiv.className = "AddDiv";
    
    post.getElementsByClassName("mainContainer")[0].appendChild(addDiv);
    const addText = document.createElement("h4");
    addText.className = "h4";
    addDiv.appendChild(addText);
    addText.innerHTML = value;

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.className = "deleteButton";
    addDiv.appendChild(deleteButton);


    const replyButton = document.createElement("button");
    replyButton.innerHTML = "Reply";
    replyButton.className = "replyButton ";
    addDiv.appendChild(replyButton); 

    textArea1.value = "";

    deleteButton.addEventListener("click",function(evt) {
        post.getElementsByClassName("mainContainer")[0].removeChild(addDiv);
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
        addDiv.appendChild(replyDiv);
        replyDiv.appendChild(textArea);
        replyDiv.appendChild(deleteReplyCommentButton);
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
    
}};
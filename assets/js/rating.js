function updateRating (post,id) {
    const bal = post.getElementsByClassName("bal")[0];
    const vote = localStorage.getItem(id);
    const hasVoted = !!vote;
    const rating = +(vote);
    const arrowUp =  post.getElementsByClassName("arrowUp")[0];
    const arrowDown = post.getElementsByClassName("arrowDown")[0];

    if(hasVoted){
        const currentRating = +bal.innerHTML;  
        bal.innerHTML = currentRating + rating;
        if(rating === 1){
            arrowUp.style.color = "green";
            arrowDown.style.color = "grey";
        }else if(rating === -1){
            arrowDown.style.color = "red";
            arrowUp.style.color = "grey";
        }else{
            arrowUp.style.color = "grey";
            arrowDown.style.color = "grey";
        }
    }
}

for (const post of posts) {
    const id = post.getAttribute("id")
    const arrowUp =  post.getElementsByClassName("arrowUp")[0];
    const arrowDown = post.getElementsByClassName("arrowDown")[0];
    const bal = post.getElementsByClassName("bal")[0];

    updateRating(post,id);

    arrowUp.addEventListener("click",function () {
        const currentRating = +bal.innerHTML;
        if(localStorage.getItem(id) === "-1"){
            bal.innerHTML = currentRating + 1;
            localStorage.setItem(id,"+1");
        }else if(localStorage.getItem(id) !== "+1") {
            localStorage.setItem(id,"+1")
        }else{
            localStorage.setItem(id,"0");
            bal.innerHTML = currentRating - 1;
        }
        updateRating(post,id)
    })

    arrowDown.addEventListener("click",function(){
        const currentRating = +bal.innerHTML;  
        if(localStorage.getItem(id) === "+1"){
            bal.innerHTML = currentRating - 1;
            localStorage.setItem(id,"-1")
        }else if(localStorage.getItem(id) !== "-1") {
            localStorage.setItem(id,"-1")
        }else{
            localStorage.setItem(id,"0");
            bal.innerHTML = currentRating  + 1;
        }
        updateRating(post,id);
    })
}


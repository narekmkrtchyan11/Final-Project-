let postArray = [
  {
    title: "Martiros Saryan",
    imgURL: "/assets/images/Saryan.jpg",
    like: "45",
  },
  {
    title: "Pablo Ruiz Picasso",
    imgURL: "/assets/images/Pablo.jfif",
    like: "12",
  },
  {
    title: "Hovhannes Aivazovski",
    imgURL: "/assets/images/Ayvazovski.jpg",
    like: "78",
  },
  {
    title: "Leonardo da Vinci",
    imgURL: "/assets/images/Monaliza.jpg",
    like: "145",
  },
];
setPost();
renderPosts();
rating();

function addPost(title, imgURL, id, like) {
  return `<div id="post${id}" class="post">
    <h2>${title}</h2>
    <div class="arrowDiv">
        <i  class="fas fa-arrow-up fa-2x arrowUp" ></i> </br>
        <p class="bal">${like}</p>
        <i  class="fas fa-arrow-down fa-2x arrowDown"></i>
    </div>
    <div class="postDiv">
        <img src="${imgURL}"  alt="">
        <div class="appearingDiv">
            <button  class="deleteCommentDiv but ">Close </button>
            <button  class="addCommentDiv but">Comment  </button>
        </div>
    </div>
    <div class="mainContainer">
    <div class="AddDiv1">
        <form class="mui-form">
                <textarea class="AddInput" type="text" maxlength="150"   placeholder="Comment" onfocus="this.placeholder = 'Please write your comment...'" onblur="this.placeholder = 'Comment'" ></textarea>
                <button class="AddButton">Add</button>
        </form>
    </div>
    </div>
</div>`;
}

function setPost() {
  let ourPosts = "";
  for (let i = 0; i < postArray.length; i++) {
    ourPosts =
      ourPosts +
      addPost(
        postArray[i].title,
        postArray[i].imgURL,
        i + 1,
        postArray[i].like
      );
  }
  document.getElementById("content").innerHTML = ourPosts;
}

const potsImageAdress = document.getElementById("potsImageAdress");
const actor = document.getElementById("actor");
const addPostButton = document.getElementById("addPostButton");

addPostButton.addEventListener("click", function (evt) {
  evt.preventDefault();
  if (potsImageAdress.value.includes("http") && actor.value !== "") {
    let nextPost = {
      title: actor.value,
      imgURL: potsImageAdress.value,
      like: "0",
    };
    let postArrayClone = postArray;
    postArray = [];
    postArray.push(nextPost);
    postArray.push(...postArrayClone);
    setPost();
    potsImageAdress.style.border = "1px solid black";
    actor.style.border = "1px solid black";
  } else {
    potsImageAdress.style.border = "1px solid red";
    actor.style.border = "1px solid red";
  }
  renderPosts();
  rating();
});

function renderPosts() {
  const posts = document.getElementsByClassName("post");
  for (const post of posts) {
    const addButton = post.getElementsByClassName("AddButton")[0];
    const mainContainer = post.getElementsByClassName("mainContainer")[0];
    const addCommentDiv = post.getElementsByClassName("addCommentDiv")[0];
    const deleteCommentDiv = post.getElementsByClassName("deleteCommentDiv")[0];
    const bal = post.getElementsByClassName("bal")[0];

    addCommentDiv.addEventListener("click", function () {
      mainContainer.style.display = "block";
      const commentArea = post.getElementsByClassName("AddInput")[0];
      commentArea.focus();
    });

    deleteCommentDiv.addEventListener("click", function () {
      mainContainer.style.display = "none";
    });

    addButton.addEventListener("click", function (evt) {
      evt.preventDefault();
      const textArea1 = evt.target.previousElementSibling;
      const comment = textArea1.value;
      if (comment !== "") {
        addCommentFunc(comment, textArea1);
      }
    });

    function addCommentFunc(value, textArea1) {
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

      deleteButton.addEventListener("click", function (evt) {
        post.getElementsByClassName("mainContainer")[0].removeChild(addDiv);
      });
      let f = 0;
      replyButton.addEventListener("click", function () {
        if (f === 0) {
          f++;
          const replyDiv = document.createElement("div");
          replyDiv.className = "replyDiv";
          const textArea = document.createElement("textarea");
          textArea.maxLength = "70";
          textArea.className = "textArea";
          const addReplyCommentButton = document.createElement("button");
          addReplyCommentButton.className = "addReplyCommentButton";
          addReplyCommentButton.innerText = "Add";
          addDiv.appendChild(replyDiv);
          replyDiv.appendChild(textArea);
          replyDiv.appendChild(addReplyCommentButton);
          textArea.placeholder = "Reply Comment";
          let textAreaValue = "";

          textArea.addEventListener("keyup", function (evt) {
            textAreaValue = evt.target.value;
            return textAreaValue;
          });

          addReplyCommentButton.addEventListener("click", function (evt) {
            if (textArea.value !== "") {
              evt.preventDefault();
              const replyCommentDiv = document.createElement("div");
              replyCommentDiv.className = "replyCommentDiv";
              replyCommentDiv.innerText = textAreaValue;

              const deleteReplyButton = document.createElement("button");
              deleteReplyButton.innerText = "Delete";
              deleteReplyButton.className = "deleteReplyButton";
              replyCommentDiv.appendChild(deleteReplyButton);
              deleteReplyButton.addEventListener("click", function () {
                addDiv.removeChild(replyCommentDiv);
              });
              addDiv.appendChild(replyCommentDiv);
              textArea.value = "";
            }
          });
        }
      });
    }
  }
}

function rating() {
  function updateRating(post, id) {
    const bal = post.getElementsByClassName("bal")[0];
    const vote = localStorage.getItem(id);
    const hasVoted = !!vote;
    const rating = +vote;
    const arrowUp = post.getElementsByClassName("arrowUp")[0];
    const arrowDown = post.getElementsByClassName("arrowDown")[0];

    if (hasVoted) {
      const currentRating = +bal.innerHTML;
      bal.innerHTML = currentRating + rating;
      if (rating === 1) {
        arrowUp.style.color = "green";
        arrowDown.style.color = "grey";
      } else if (rating === -1) {
        arrowDown.style.color = "red";
        arrowUp.style.color = "grey";
      } else {
        arrowUp.style.color = "grey";
        arrowDown.style.color = "grey";
      }
    }
  }

  const posts = document.getElementsByClassName("post");

  for (const post of posts) {
    const id = post.getAttribute("id");
    const arrowUp = post.getElementsByClassName("arrowUp")[0];
    const arrowDown = post.getElementsByClassName("arrowDown")[0];
    const bal = post.getElementsByClassName("bal")[0];

    updateRating(post, id);

    arrowUp.addEventListener("click", function () {
      const currentRating = +bal.innerHTML;
      if (localStorage.getItem(id) === "-1") {
        bal.innerHTML = currentRating + 1;
        localStorage.setItem(id, "+1");
      } else if (localStorage.getItem(id) !== "+1") {
        localStorage.setItem(id, "+1");
      } else {
        localStorage.setItem(id, "0");
        bal.innerHTML = currentRating - 1;
      }
      updateRating(post, id);
    });

    arrowDown.addEventListener("click", function () {
      const currentRating = +bal.innerHTML;
      if (localStorage.getItem(id) === "+1") {
        bal.innerHTML = currentRating - 1;
        localStorage.setItem(id, "-1");
      } else if (localStorage.getItem(id) !== "-1") {
        localStorage.setItem(id, "-1");
      } else {
        localStorage.setItem(id, "0");
        bal.innerHTML = currentRating + 1;
      }
      updateRating(post, id);
    });
  }
}

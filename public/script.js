let button = document.getElementById("showReviews");
button.onclick = showReviews;

function showReviews(e) {
  try {
    let xhrGet = new window.XMLHttpRequest();
    xhrGet.open("GET", "http://localhost:3000/api/grads");
    xhrGet.onload = () => {
      const parsedData = JSON.parse(xhrGet.responseText);
      console.log(parsedData);

      //This for loop will create an entry for each review
      //And its delete button
      for (let x = 0; x < parsedData.length; x++) {
        //Create an element called item and fill it with info
        //about each review
        let item = document.createElement("li");
        item.id = parsedData[x]._id;
        item.innerHTML = parsedData[x].name;
        item.innerHTML += "<br>";
        item.innerHTML += parsedData[x].gradDate;
        item.innerHTML += "<br>";
        item.innerHTML += parsedData[x].review;

        //Then we make a button and attach it to the item
        let button = document.createElement("button");
        button.innerHTML = "delete";
        item.appendChild(button);
        //A click will trigger this function
        item.addEventListener("click", e => {
          e.preventDefault();
          //this is where we take the id of each item so we know which one to delete
          let id = parsedData[x]._id;
          console.log(id);
          try {
            let xhrDelete = new window.XMLHttpRequest();
            xhrDelete.open("DELETE", `http://localhost:3000/api/grads/${id}`);
            xhrDelete.onload = () => {
              //this clears everything on the page
              document.body.innerHTML = "";
              //and then calls this again to reflect the deletion
              showReviews(e);
            };
            xhrDelete.send();
          } catch (error) {
            console.error(error);
          }
        });

        document.body.appendChild(item);
      }
    };
    xhrGet.send();
  } catch (error) {
    console.error(error);
  }
}

function addReview(e) {
  e.preventDefault();
  console.log("Submit");

  let grad = {
    name: document.getElementById("name").value,
    gradDate: document.getElementById("gradDate").value,
    review: document.getElementById("review").value
  };

  try {
    let xhrPost = new window.XMLHttpRequest();
    xhrPost.open("POST", "http://localhost:3000/api/grads");
    xhrPost.setRequestHeader("Content-Type", "application/json");
    xhrPost.send(JSON.stringify(grad));
  } catch (error) {
    console.error(error);
  }
}

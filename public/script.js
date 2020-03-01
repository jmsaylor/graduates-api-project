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

        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "delete";

        deleteButton.addEventListener("click", e => {
          e.preventDefault();

          let id = parsedData[x]._id;
          console.log(id);
          try {
            let xhrDelete = new window.XMLHttpRequest();
            xhrDelete.open("DELETE", `http://localhost:3000/api/grads/${id}`);
            xhrDelete.onload = () => {
              location.reload();
            };
            xhrDelete.send();
          } catch (error) {
            console.error(error);
          }
        });

        item.appendChild(deleteButton);

        let editButton = document.createElement("button");
        editButton.innerHTML = "edit";

        editButton.addEventListener("click", e => {
          e.preventDefault();

          let grad = {
            name: document.getElementById("name").value,
            gradDate: document.getElementById("gradDate").value,
            review: document.getElementById("review").value
          };

          let id = parsedData[x]._id;
          console.log(id);
          try {
            let xhrEdit = new window.XMLHttpRequest();
            xhrEdit.open("PATCH", `http://localhost:3000/api/grads/${id}`);
            xhrEdit.setRequestHeader("Content-Type", "application/json");
            // xhrEdit.onload = () => {
            //   location.reload();
            // };
            xhrEdit.send(JSON.stringify(grad));
            location.reload();
          } catch (error) {
            console.error(error);
          }
        });
        item.appendChild(editButton);
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

    //We should check to see if succesful before clearing the form
    document.getElementById("form").reset();
  } catch (error) {
    console.error(error);
  }
}

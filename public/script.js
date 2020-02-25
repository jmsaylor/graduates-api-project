let button = document.getElementById("showReviews");
button.onclick = showReviews;

function showReviews(e) {
  try {
    let xhrGet = new window.XMLHttpRequest();
    xhrGet.open("GET", "http://localhost:3000/api/grads");
    xhrGet.onload = () => {
      const parsedData = JSON.parse(xhrGet.responseText);
      console.log(parsedData);
      for (let x = 0; x < parsedData.length; x++) {
        let item = document.createElement("li");
        item.id = parsedData[x]._id;
        item.innerHTML = parsedData[x].name;
        item.innerHTML += "<br>";
        item.innerHTML += parsedData[x].gradDate;
        item.innerHTML += "<br>";
        item.innerHTML += parsedData[x].review;
        let button = document.createElement("button");
        button.innerHTML = "delete";

        item.addEventListener("click", e => {
          e.preventDefault();
          let id = parsedData[x]._id;
          console.log(id);
          try {
            let xhrDelete = new window.XMLHttpRequest();
            xhrDelete.open("DELETE", `http://localhost:3000/api/grads/${id}`);
            xhrDelete.onload = () => {
              document.body.innerHTML = "";
              showReviews(e);
            };
            xhrDelete.send();
          } catch (error) {
            console.error(error);
          }
        });
        item.appendChild(button);
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

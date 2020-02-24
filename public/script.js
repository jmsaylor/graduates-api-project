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

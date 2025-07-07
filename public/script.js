//fetching data from the api/blog endpoint
fetch("/api/blog")
  .then((response) => response.json())
  .then((data) => {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";
    data.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.classList.add("post");
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        <p>${post.body}</p>
      `;
      postsContainer.appendChild(postElement);
    });
  })
  .catch((error) => {
    console.error("Error fetching blog posts:", error);
  });
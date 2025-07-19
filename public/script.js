// Fetching data from the api/blog endpoint
fetch("/api/blog")
  .then((response) => response.json())
  .then((data) => {
    const postsContainer = document.getElementById("posts");
    postsContainer.innerHTML = "";// Clear existing content
    // Loop through the data and create HTML elements for each post
    data.forEach((post) => {
      const postElement = document.createElement("div");// Create a new div for each post
      postElement.classList.add("post");// Add a class for styling
      // Set the inner HTML of the post element
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p><strong>Author:</strong> ${post.author}</p>
        <p>${post.body}</p>
      `;
      postsContainer.appendChild(postElement);// Append the post element to the container
    });
  })
  .catch((error) => {
    console.error("Error fetching blog posts:", error);// Log any errors to the console
  });
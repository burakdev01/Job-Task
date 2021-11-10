(async function fetchUsers() {
  try {
    let users = await fetch("https://jsonplaceholder.typicode.com/users");
    users = await users.json();
    fetchPosts(users);
  } catch (e) {
    alert("Users cannot be loaded: " + e);
  }
})();

async function fetchPosts(users) {
  try {
    let posts = await fetch("https://jsonplaceholder.typicode.com/posts");
    posts = await posts.json();
    parseUsers(users, posts, true);
  } catch (e) {
    parseUsers(users, [], false, e);
  }
}

function parseUsers(users, posts = [], success = false, e = null) {
  const table = document.getElementById("userList");

  users.map(user => {
    const row = table.insertRow();

    row.onclick = function () {
      if (success) {
        const table = document.getElementById("postList");
        table.innerHTML = "";
        const postsOfUser = posts.filter(post => post.userId === user.id);
        parsePosts(postsOfUser);
      } else {
        alert("Posts cannot be loaded: " + e);
      }
    };

    const id = row.insertCell();
    const name = row.insertCell();
    const username = row.insertCell();
    const email = row.insertCell();
    id.textContent = user.id;
    name.textContent = user.name;
    username.textContent = user.username;
    email.textContent = user.email;
  });
}

function parsePosts(posts) {
  const table = document.getElementById("postList");

  posts.map(post => {
    const row = table.insertRow();
    const id = row.insertCell();
    const title = row.insertCell();
    const body = row.insertCell();

    id.textContent = post.id;
    title.textContent = post.title;
    body.textContent = post.body;
  });
}

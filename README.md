# 📰 Article Sharing Platform

A full-stack MERN (MongoDB, Express.js, React, Node.js) web application that allows users to share and explore articles on any topic.

Users can register, log in, create, edit, and delete their own articles, as well as comment on any article. The application uses `bcrypt` to securely hash passwords and `jsonwebtoken` for secure user authentication via JSON Web Tokens (JWT).


**Link to Backend:** [https://github.com/naomixnyc/WriteBoard-express](https://github.com/naomixnyc/WriteBoard-express)

**Link to deployed Site:** [https://writeboard-react.onrender.com/](https://writeboard-react.onrender.com/)  
Please feel free to create an account (by providing any name, email, and password) or use the test login (email: a@c.com, password: 123) to explore the app.



## 👤 Frontend Walkthrough

- Landing page displays all articles, sorted by timestamp (latest first)
- Users must sign up (name, email, password) or log in (email, password)
- Authenticated users can:
  - Create, edit, and delete their own articles
  - Comment on any article
- Articles are written in Markdown and rendered as clean HTML
- Login status persists even after a page reload
- Users can search for an article by title



## 🛠 Technologies Used

### **Frontend**
- **React**
- `jwt-decode` — Decodes JWTs in the browser to retrieve user info

### **Backend**
- `Node.js` / `Express`
- `MongoDB`: NoSQL database used to store users, posts, and comments
- `mongoose`: ODM for MongoDB with schema-based modeling
- `bcrypt`: Hashes passwords securely before storing them
- `jsonwebtoken`: Issues secure stateless tokens for authentication
- `cors`: Enables cross-origin requests
- `dotenv`: Manages environment variables

### Full Stack & Utilities
- `marked`: Parses Markdown to HTML for article content
- `dompurify`: Sanitizes HTML output from Markdown to prevent XSS
- `jsdom`: Simulates a browser environment to support `dompurify`
- `slugify`: Converts article titles into URL-safe strings for slugs (though not utilized in this version)


#### 🧩 Middleware Feature (Article Model)
This middleware runs automatically **before each `.save()`** operation on an article:


```js
// ==== MIDDLEWARE: Generate slug and sanitized HTML ===
// runs *before* each .save() on the model

articleSchema.pre('save', function (next) { 
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });  
  }

  if (this.isModified('content')) {
    const rawHtml = marked(this.content);   // convert markdown to raw HTML
    this.sanitizedHtml = dompurify.sanitize(rawHtml);  // sanitize HTML output
  }

  next();
});
const Article = mongoose.model('Article', articleSchema);
export default Article;
```

## 🧠 Technical Decisions & Features

- **Authentication & Security**
  - Passwords are hashed using `bcrypt` to protect user credentials in the database.
  - On successful login, the backend generates a JWT using `jsonwebtoken`, which is stored in `localStorage` on the client.
  - The token allows users to remain logged in across page reloads (`jwt-decode` helps the frontend extract user info from the token).
  - Conditional UI rendering:
    - The user’s name is automatically filled in when posting articles or comments.
    - Edit/Delete buttons appear only for the logged-in user’s own articles.

- **Markdown Support**
  - Articles use `marked` to parse Markdown into HTML.
  - The HTML is sanitized using `dompurify` and `jsdom` to prevent XSS attacks before rendering.

- **Database Modeling with Mongoose**
  - Models and schemas are used to handle full CRUD operations for authers, articles, and comments.



## 📚 Resources and References

- [bcrypt documentation](https://www.npmjs.com/package/bcrypt)
- [jsonwebtoken documentation](https://www.npmjs.com/package/jsonwebtoken)
- [dotenv documentation](https://www.npmjs.com/package/dotenv)
- [jwt-decode documentation](https://www.npmjs.com/package/jwt-decode)
- [Express.js documentation](https://expressjs.com/)
- [Mongoose documentation](https://mongoosejs.com/)
- [YouTube | Web Dev Simplified — JWT Authentication Tutorial - Node.js](https://www.youtube.com/watch?v=mbsmsi7l3r4)



## 🔮 Future Plans

- Add reply feature to comments (nested comments)
- Create and filter articles by categories
- Implement session and role-based permission system:
  - Only admins can delete users (or any article)
  - Admin dashboard for managing content
- Improve UI/UX for better navigation and usability
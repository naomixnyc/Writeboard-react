# Article Sharing Platform

This is a full-stack web application for sharing articles on any topic. Users can register, log in, post articles, edit or delete their own posts, and comment on any article. The app uses `bcrypt` to securely hash passwords before storing them. Upon login, the password is verified, and a JSON Web Token (JWT) is issued using the `jsonwebtoken` library. 

### Link to Backend 
**Link to Backend:** [https://github.com/naomixnyc/WriteBoard-express](http://your-backend-url.com)

## 👤 User Stories

- As a user, I can **sign up** with an email and password.
- As a user, I can **log in** to access the main page.
- After login, I am redirected to the **main page** showing all articles listed by **latest date**, each showing:
  - Title
  - Description
  - Author
  - Published date
- Clicking on an article shows the **full article** (title + body).
- If I am the **author**, I can:
  - Edit the article
  - Delete the article
  - Comment on the article
- If I am **not the author**, I can still **comment** on the article.
- I must be **logged in** to create, edit, delete, or comment.


## Technologies Used

### **Frontend**
- `jwt-decode`

### **Backend**
- `bcrypt`: for hashing user passwords
- `jsonwebtoken`: for creating and verifying JWTs
- `cors`: to handle cross-origin requests
- `dotenv`: for environment variable management
- `express`: server framework
- `mongoose`: MongoDB object modeling


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
  - Only admins can delete users or any article
  - Admin dashboard for managing content
- Improve UI/UX for better navigation and usability
## BOOGLE

## DESCRIPTION

This is an application where you can create your own personal bookshelf with books that you already read. The user has access to a lot of details about each book. With the implementation of the search bar, you will be able to look through a huge selection of books.

## USER STORIES

404 - As a user you want to see a nice #404 page in case the page doesn't exist.

Homepage - As a user you want to be able to sign-up, log-in & access your profile and search for books.

Sign up - As a user you want to sign up so you can see the details of your book search & add them to your book shelf.

Login - As a user you want to log in and access your profile & bookshelf.

Logout - As a user you want to be able to log out from the webpage so that you can make sure no one will access your account.

UserProfile - As a user you want to access your profile and edit/delete/update your bookshelf.

Book-search-results - As a user you want to be able to search for a book and access the details of those books and save them to your profile.

## MVP

1. Wireframe
2. Navigation / user flow
3. Models
   Populate
   Schema
4. Routes
5. Views
   Partials
   Lay-out
   pages
6. External API
7. Log-in/log-out/Sign-up
8. Edit, add, delete options
9. Search bar

## BACKLOG

1. Add book reviews
2. Add another API (Unsplash)
   -Pick your personalized profile picture
   -Pimp your profile with adding a background
   -Carrousel images
3. Edit picture
4. Add extra bookshelf categories (read, favorite, want-to-read, etc)
5. Disable add button
6. Favicon
7. See friends profiles
8. Add NPM Flash (Error page that makes sense e.g.)
9. Get a message to create a profile to create/save books
10. Add category with latest added books homepage
11. Create nice looking error pages

## ROUTES

//Index
- GET / 
  - renders the homepage

//Auth
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login page
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout
  - body: 
  - render the login page

//User
-GET /:id/delete
 -deletes user
-GET /:id/edit
- renders edit profile form
-POST /:id/edit
  -renders edit page with error message if username or password invalid
  -body:
    - username
    - email
    - password
    -avatarUrl
-GET /profile
  -renders user profile

//Book search
- GET search/book-search
  - renders the search results
- GET /:id
  - renders the book details
- POST /:id
  - renders the bookshelf/my-saved-books 

//Saved book in Bookshelf
- GET /my-saved-books
  -renders pages/saved-books/saved-book-list
  -displays saved books & Populate user
- GET / my-created-books
  -renders pages/user-books/my-book-list
  -displays created books & Populate user


## MODELS

1. CreateBook
  title: String,
  authors: [String],
  publishedDate: String,
  description: String,
  bookPictureUrl: String,
  pageCount: Number,
  categories: [String],

2. SavedBook
    title: String,
    authors: [String],
    publishedDate: String,
    description: String,
    bookPictureUrl: String,
    pageCount: Number,
    categories: [String],

3. User
   username: string
   password: string
   email: string
   avatarUrl: String
   createdBooks: Schema.types
   savedBooks: Schema.types

## Additional Links

Planning Trello: https://trello.com/invite/b/3hJemUKK/faab09474b2874e63db613c004cff7f8/boogle

Link to Figma: https://www.figma.com/file/kI97V1jQGciUDm7ivvijaz/Web-Dev-Collaboration-%7C-Group-9%3A-Maran%2C-Burak%2C-Elke?node-id=107%3A171

Link to flowchart: https://excalidraw.com/

Link to the application: https://globtrottersboogle.herokuapp.com/

Link to the presentation: https://docs.google.com/presentation/d/14bxnqmi3BRrRYGN0RtPpB7vJc9V4t52ri1GdBaMtNZw/edit?usp=sharing

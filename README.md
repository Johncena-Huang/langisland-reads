# LangIsland-Reads

<p align="center"><img src="https://github.com/Johncena-Huang/langisland-reads/blob/master/demo/logo.jpg" width="100"/></p>
<div align="center">
The MERN(MongoDB, Express, React, Node) application where users can share their book reflections, import notes from <strong>notion</strong> and interact with other users via the comment system.<br>
<a href="https://langisland-reads.herokuapp.com/">Explore the website</a>
</div>

### Test account

Email: test@test.org.tw  
Password: 123456

# Table of contents

- <a href="/README.md#overview">Overview</a>
- <a href="/README.md#quick-start">Quick start</a>
- <a href="/README.md#apis-and-dependencies">APIs and dependencies</a>

# Overview

### Home page tour

<img src="/demo/home-page-demo.gif" width=650 alt="home-page-tour"/>

### Book search

<img src="/demo/book-search-demo.gif" width=650 alt="book-search-demo"/>

### Import document from `Notion`

<img src="/demo/import-notion-demo-2.5x.gif" width=650 alt="import-notion-demo"/>

### Leavea the comment

<img src="/demo/leave-comment-demo.gif" width=650 alt="leave-comment-demo"/>

### Like the comment

<img src="/demo/like-comment-demo.gif" width=650 alt="like-comment-demo"/>

# Quick start

### Clone the project to your local machine

<pre> $ git clone https://github.com/Johncena-Huang/langisland-reads.git </pre>

> The following commands should be entered in the root of the directory.

### Install all the dependencies for both server and client

<pre> $ npm i </pre>

### Create environment variable

<pre> $ touch .env </pre>

### Enter the corresponding keys in the `.env` file

<strong> Please have a look at the [APIs](/README.md#third-party-apis-1) mentioned for the backend server </strong>

<pre> 
// .env
SENDGRID_API_KEY=
EMAIL_FROM=
NAME="LangIslandEnglishClub Admin"
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_CALLBACK_URL="http://localhost:3000"
NOTION_CLIENTID=
NOTION_CLIENT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_CLOUD_KEY=
CLOUDINARY_CLOUD_SECRET=
DOMAIN=http://localhost:3456
</pre>

> The **Redirect URIs** for `Notion`API shoud be set to http://localhost:3000/oauth/notion/callback

### Start `Mongodb` server

<pre> mongod </pre>

> By default, the server connects to mongodb server on **port 27017**

### Start the development server

<pre> $ npm run dev </pre>

Check in browser on http://localhost:3456/

# APIs and Dependencies

## Frontend

### Third party APIs

Using [New York Times API](https://developer.nytimes.com/) to fetch the list of best sellers and their book information(`isbn number`)

Using [Google Book API](https://developers.google.com/books/docs/v1/using) to fetch the `cover image` based on the isbn number of each book

### Functional

Using [react](https://reactjs.org/) for React framework to build the user interfaces on the website.

Using [react-router-dom](https://reactrouter.com/) for router implemented on the client-side.

Using [redux](https://redux.js.org/), [react-redux](https://react-redux.js.org/) for hooking up React to redux and state management.

Using [redux-thunk](https://github.com/reduxjs/redux-thunk) to combine different action creators together and create a new one so that each one can be kept compact and small.

Using [redux-persist](https://github.com/rt2zz/redux-persist) to persist certain piece of state in order to avoid redirect upon `refresh(F5)` in protected routes.

Using [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware) to connect frontend to backend in development via proxy.

Using [uuid](https://github.com/uuidjs/uuid) to create non-repeating random numbers assigned to each alert message.

### Visual

Using [tinymce-react](https://www.tiny.cloud/docs/integrations/react/) for its out-of-the-box, customizable `WYSIWYG HTML editor`

Using [swiper](https://swiperjs.com/react) for its highly customizable carousel component

Using [react-lazy-load-image-component](https://github.com/Aljullu/react-lazy-load-image-component) for lazy-loading the image onto the page with blurry and giving a better user experience

Using [react-animate-on-scroll](https://github.com/dbramwell/react-animate-on-scroll) to animate elements on scroll with [animate.css](https://animate.style/), which provides a wide array of animation effects.

Using [react-fontawesome](https://fontawesome.com/v5/docs/web/use-with/react) for using fontawesome icon library in the React project

Using [bootstrap](https://getbootstrap.com/) CSS framework to quickly create a responsive website.

Using [react-bootstrap](https://react-bootstrap.github.io/) to use special components in the React project

Using [react-router-bootstrap](https://github.com/react-bootstrap/react-router-bootstrap) to make bootstrap component behave like a React router `<Link>`.

Using [sass](https://www.npmjs.com/package/sass) for compiling SASS into CSS in order to customize bootstrap.

Using [github-markdown-css](https://github.com/sindresorhus/github-markdown-css) to style the markdown text.

## Backend

### Third party APIs

Using [Google OAuth 2.0](https://developers.google.com/identity/protocols/oauth2) for `OAuth` to authenticate users on the server.

Using [Notion API](https://developers.notion.com/) to access the documents for the given users from `Notion` in our application.

Using [Cloudinary](https://cloudinary.com/) cloud service for storing the images.

Using [SendGrid API](https://sendgrid.com/) for sending the verification emails to newly-registered users.

### Functional

Using [express](https://github.com/expressjs/express) to set up the main logic of backend server

Using [express-session](https://github.com/expressjs/session) to make the visits of the user stateful in between requests

Using [connect-mongo](https://github.com/jdesboeufs/connect-mongo) to set up the session store and hook it up to MongoDB MongoDB Atlas Database

Using [passport, passport-local, passport-local-mongoose, passport-google-oauth2](https://www.passportjs.org/) to set up user authentication and authorization for both local and google login

Using [multer-storage-cloudinary](https://github.com/affanshahid/multer-storage-cloudinary) and [cloudinary](https://cloudinary.com/) for storing the picture file on the external cloud storage space.

Using [@sendgrid/mail](https://github.com/sendgrid/sendgrid-nodejs) for connecting to Twilio SendGrid Web API v3 via Node.js and sending the email verification letter to new registered user

Using [html-to-text](https://github.com/html-to-text/node-html-to-text) to parse HTML and convert it to text.

Using [@notionhq/client](https://github.com/makenotion/notion-sdk-js) for connecting to Notion API and grabbing the documents for the login user.

Using [notion-to-md](https://github.com/souvikinator/notion-to-md) to convert fetched notion document blocks to markdown.

Using [markdown-it](https://github.com/markdown-it/markdown-it) to convert markdown to HTML

Using [joi](https://github.com/hapijs/joi) to implement server side data validation on incoming form data.

Using [moment](https://momentjs.com/) to formulate date

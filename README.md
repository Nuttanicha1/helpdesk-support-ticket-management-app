# helpdesk-support-ticket-management-app
Assignment Test for internship

In this app you can
#### - Register
#### - Login/Logout
#### - Create / Edit / Filter By Status Tickets


### Set Environment Variables

Rename the .envexample to .env and add your [MongoDB](https://www.mongodb.com/) database URI and your JWT secret

### Install backend dependencies

```bash
npm install
```

### Install client dependencies

```bash
cd frontend
npm install
```

### Run app in development (frontend & backend)

```bash
npm run dev
```

or

```bash
cd frontend
npm start

&&

cd backend
npm run server
```


### If you have error 
### "Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
### - options.allowedHosts[0] should be a non-empty string.
### Go to frontend\node_modules\react-scripts\config\webpackDevServer.config.js and change line 46 from
### allowedHosts: disableFirewall ? 'all' : [allowedHost],
### to

```bash
allowedHosts: disableFirewall ? 'all' : "localhost",
```

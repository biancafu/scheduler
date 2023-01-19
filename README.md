# Interview Scheduler
Interview Scheduler is a simple tool for scheduling interview appointments. It is a responsive, single-page web app designed using React that stores schedule information in a database and updates the schedule for concurrent users via WebSockets.
## Setup

Install all dependencies with: 
```sh
npm install
```
### Dependencies

Interview Scheduler requires [Node.js](https://nodejs.org) and [Postgres](https://www.postgresql.org/) and the following [NPM](https://www.npmjs.com/) packages are used:

- [react](https://www.npmjs.com/package/react)
- [react-dom](https://www.npmjs.com/package/react-dom)
- [react-scripts](https://www.npmjs.com/package/react-scripts)
- [axios](https://www.npmjs.com/package/axios)
- [classnames](https://www.npmjs.com/package/classnames)
- [normalize.css](https://www.npmjs.com/package/normalize.css)

### Development Dependencies

The following NPM packages are used for development:

- [react-test-renderer](https://www.npmjs.com/package/react-test-renderer)
- [prop-types](https://www.npmjs.com/package/prop-types)
- [node-sass](https://www.npmjs.com/package/node-sass)
- [cypress](https://www.npmjs.com/package/cypress)
- [eslint-plugin-cypress](https://www.npmjs.com/package/eslint-plugin-cypress)


## Database Setup
Use the `psql -U development` command to login to the PostgreSQL server with the username `development` and the password `development`. This command **MUST** be run in a vagrant terminal, we are using the PostgreSQL installation provided in the vagrant environment.

Create a database with the command `CREATE DATABASE scheduler_development;`.

Copy the `.env.example` file to `.env.development` and fill in the necessary PostgreSQL configuration. The `node-postgres` library uses these environment variables by default.

```
PGHOST=localhost
PGUSER=development
PGDATABASE=scheduler_development
PGPASSWORD=development
PGPORT=5432
```

## Seeding

Run a the development server with `npm start` in the Host environment. We are only using vagrant for `psql` this week.

Both of these achieve the same result.

- Make a `GET` request to `/api/debug/reset` with `curl http://localhost:8001/api/debug/reset`.
- Use the browser to navigate to `http://localhost:8001/api/debug/reset`.

The `development` data is random. Each time we seed we expect to see different appointments.


# Running/Testing Server
## Running Webpack Development Server
Runs the app in the development mode.
Open http://localhost:8000 to view it in your browser.
```sh
npm start
```

## Running Jest Test Framework
Launches the test runner in the interactive watch mode.
```sh
npm test
```

## Running Storybook Visual Testbed
Storybook is an excellent tool for testing React components in isolation from the rest of the application.
This will launch storybook in browser.
```sh
npm run storybook
```

## Running Cypress
Cypress is a next generation front end testing tool built for the modern web. This command opens the cypress launchpad.
```sh
npm run cypress
```
# Screenshots

!["Initial display"](https://github.com/biancafu/scheduler/blob/master/docs/appointment-show.png) <br>
!["Hover on an appointment, edit/delete button shows up"](https://github.com/biancafu/scheduler/blob/master/docs/appointment-edit%26delete_button.png) <br>
!["Add/Edit an appointment"](https://github.com/biancafu/scheduler/blob/master/docs/appointment-form%20(add%26edit).png)


# APIs

To reset data run:
```sh
/api/debug/reset
```
### Days
`GET /api/days`

Response

```json
[
  {
    "id": 1,
    "name": "Monday",
    "appointments": [1, 2],
    "interviewers": [1, 2],
    "spots": 0
  }
]
```

### Appointments

`GET /api/appointments`

Response:

```json
{
  "1": {
    "id": 1,
    "time": "12pm",
    "interview": {
      "student": "Lydia Miller-Jones",
      "interviewer": 1
    }
  },
  "2": {
    "id": 2,
    "time": "1pm",
    "interview": {
      "student": "Archie Cohen",
      "interviewer": 2
    }
  }
}
```

`PUT /api/appointments/:id`

Body:

```json
{
  "interview": {
    "student": String,
    "interviewer": Number
  }
}
```

`DELETE /api/appointments/:id`

### Interviewers

`GET /api/interviewers`

Response:

```json
{
  "1": {
    "id": 1,
    "name": "Sylvia Palmer",
    "avatar": "https://i.imgur.com/LpaY82x.png"
  },
  "2": {
    "id": 2,
    "name": "Tori Malcolm",
    "avatar": "https://i.imgur.com/Nmx0Qxo.png"
  }
}
```
# HackNews

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.6.

## Dependencies
Run `npm install` in `root` folder and in `/server` folder to get all the dependencies via npm.

## Development server
Run `npm install here`
Run `ng serve` for a dev server frontend. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


There is also a stub like RESTful JSON API server in server/ folder.
It is built in [NodeJS] using express server and light-weight [NEDB](https://github.com/louischatriot/nedb) file like no-s1ldatabase 
Initial file `challenges.db` has be included for ease of initial data. It can be deleted.

Run `cd server`
Run `node server.js` to run server on `http://localhost:300`

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
Change basehref to `.` before doing the above

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

# NgMapsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.1.1.

The project is designed for work with Google Maps including saving important locations in the Firebase Store.
For people work want to travel virtually it is also a great app, because it allows you to search, select and watch almost any location in the world.

## Quick tutorial

![Quick tutorial](https://raw.githubusercontent.com/ShadowDrake21/ng-maps-app/main/src/assets/readme-gif.gif)

## Functionality

Everything starts from signing up via Github or entering the application as a guest without saving any information in the Firebase.
The project uses OpenStreetMap API and OpenWeather API for location searching.
The user has two ways to manipulate with map data: by input and by the map itself using double clicking. The latter option automatically makes the location marked and recordes it in the user's Firestore section. 
If the user is in a guest mode the marked locations functionality is unabled. 
If the user has saved locations, they can be managed at the bottom of the app (marked locations section).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

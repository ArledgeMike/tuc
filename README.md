# The Uprising Creative Front End Challenge

To develop need to have NodeJS and NPM.

## Task Runner

To be able to run automated tasks, install gulp command line tool:

    npm install gulp-cli -g

## Project Dependencies

To install project dependencies run:

    npm install

## Development

To start developing run following command:

    gulp dev

It will compile JavaScript and SCSS files an will start watching files, so that when file changes it will recompile immediately.

# Testing

Keep tests close to the source file. Each test file should have the same name as module that is being tested and end with *.spec.js.

Spec should follow following format, top level should be module, second level method name. It should describe expected behaviour

    ProductsStore
        #loadProductsDone()
            - should set loading state to false

## Runing Tests

    gulp tests
   
To run specific test:

    gulp tests --spec excelService,otherService

## Code Coverage

To view code coverage run:

    gulp coverage

Or to view coverage for specific tests:

    gulp coverage --spec excelService,otherService

## Linting

To make sure source code adheres to desired standards, run linter on you code:

    gulp eslint

    

# TODO App

This is a simple to-do application built with React, zustand, and Next.js.

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Zustand**: A minimalistic state management library for React applications.
- **Next.js**: A React framework for production-ready applications.
- **Material-UI**: A popular React UI framework for building beautiful and responsive 
applications.
- **TypeScript**: A typed superset of JavaScript that compiles to plain JavaScript.
- **Tailwind CSS**: A utility-first CSS framework for creating custom designs without having to leave your HTML.
- **Jest**: A delightful JavaScript testing framework with a focus on simplicity.
- **Docker**: A platform for developing, shipping, and running applications using containerization.


## Project Structure
```
TODO-APP
├── __mocks__
├── __tests__
├── app
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   ├── addTask
│   ├── taskDialog
│   ├── tasksBrief
│   └── tasksList
├── store
│   └── useTasksStore.ts
├── types
├── public
├── .eslintrc.json
├── .gitignore
├── Dockerfile
├── jest.config.ts
├── jest.setup.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.ts
└── tsconfig.json
```
## Getting Started

1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server.
4. Open http://localhost:3000 in your browser.

## Building and Running for Production

1. Run `docker build -t todo-app .` to build a Docker image.
2. Run `docker run -p 3000:3000 todo-app` to run the app in a Docker container.

## Testing

1. Run `npm run test` to run the unit tests.
2. Run `npm run test:watch` to run the unit tests in watch mode.

## Test Coverage

Here is the test coverage report for the project:

```
| File                   | % Stmts | % Branch | % Funcs | % Lines |
|------------------------|---------|----------|---------|---------|
| All files              | 99.65   | 93.75    | 100     | 99.65   |
| components/addTask     | 100     | 100      | 100     | 100     |
| index.tsx              | 100     | 100      | 100     | 100     |
| components/taskDialog  | 100     | 94.11    | 100     | 100     |
| index.tsx              | 100     | 94.11    | 100     | 100     |
| components/tasksList   | 100     | 100      | 100     | 100     |
| TaskItem.tsx           | 100     | 100      | 100     | 100     |
| index.tsx              | 100     | 100      | 100     | 100     |
| store                  | 98.24   | 88.23    | 100     | 98.24   |
| useTasksStore.ts       | 98.24   | 88.23    | 100     | 98.24   |

Test Suites: 4 passed, 4 total
Tests: 14 passed, 14 total
```
These are the summary statistics of the test suites.



# A demo Social media App

## A social media app based on a typescript-express server in the backend, Next and React.js for the frontend and Mongodb Atlas as the database

# Basic Setup:
## before you run the server, here are some steps you must follow:

## Install the npm packages required for the app via the command
```sh
$ npm install
```

## Create a config.env file in the root dir to store your essentials data
```env
DB=your_mongo_database_url
PORT=your_server_port
SECRET_KEY=your_secret_jwt_authentication_key
```
## If the following variables are not set, some default values will be taken instead of them but they are not recommended

## Note: IF you want to change the name or path of your .env file, Please mention the path in the index.ts file at the following line:
```ts
2 config({ path:'your env file path' })
```
## Now follow the following instructions to run the server

# Instructions:
## to build the app for production, run the following command
```sh
$ npm run build
```
## THis will create a dist folder with the JavaScript Files that are ready to be run

## to start the server do
```sh
$ npm run start
```
## or
```sh
$ node dist/index.js
```

## If you wanna run the server in development mode, run the following command
```sh
$ npm run dev
```

# Contributing

## If you wanna contribute to the project, YOu are welcome to do that! , Just follow the following steps

## 1. Create a fork of this repository so you can get started
## 2. Write Some Code!, once you think your code is finished, you can commit and push the changes to your forked repository. There's a accessory to do that
## run the following command in your git cli to push your changes
```sh
$ chmod +x ./git.sh
$ ./git.sh
```
## It will ask you some simple prompts and voila! your code is now pushed to github
## 3. Now create a pull request to the original repository and your code shall be seen, and if it is approved, congrats! you are a contributor!

# Volunteer Hub - API
![License](https://img.shields.io/badge/License-MIT-blue.svg)

It's an application programming interface for connecting the project's database with the client side interface, and performing validations.

## Summary
- [How to set it up?](#1-how-to-set-it-up)
    - [Installing](#11-installing)
    - [Starting](#12-starting)
- [Technologies used](#2-technologies-used)

## 1. How to set it up?
To set up the project, you first need to have installed the following technologies on your machine:
- [Node.js](https://github.com/nodejs/node)
- [Node Package Manager](https://github.com/npm/documentation)

### 1.1 Installing
To install the project, clone this repository, and run the following command in the folder called `server` to install the project's dependencies:
`npm install`

### 1.2 Starting
First, you need to create an environment using the `server` folder as the root folder with the following variables set:
- **TOKEN:** a token to make the user authentication.
- **ADDRESS:** a link to the database.

To start the project, you just need to run the following command in the `server` folder:
`npm run start`

## 2 Technologies used
This project uses the following technologies:
- **Express.js** 
- **Javascript**
- **[NPM](https://github.com/npm/documentation)**
- **[Node.js](https://github.com/nodejs/node)**
- **JWT**
- **Sequelize**
- **Postegresql**
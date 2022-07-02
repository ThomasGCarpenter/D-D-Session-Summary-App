# DnD-Session-Summary-App

This App will initially prompt the user for information, consecutively,  regarding the prior session (New People Encountered, Hit Points, New Items, Remarkable moments, Notes about Party Members, Money, etc). This information will then be rendered and displayed onto a one-page summary styled sheet. 

## Features:
1. Can be saved.
2. Can be worked on collaboratively.
3. CRUD Functionality.
4. Can have multiple sessions. 


## Tech Stack
- Language: TypeScript https://www.typescriptlang.org/
- Client
    - React JS (View Layer) https://reactjs.org/ 
- Server
    - Node JS (Platform)
    - Fastify (API Server) https://www.fastify.io/
- Database
    - Mongo DB

## Data Model

Campaign is composed of multiple sessions.
A Campaign Session is all of the user sessions that occur in that campaign session.

## Brainstorm Ideas
- User signs In
- User "Logs a Session" (Better Naming)
- User is presented with Cards (Questions they answer). Saved after every entry.
  - To start, this information is a number of fields on one form, that can be entered and submitted.
  - UX improvement down the line would be one question cards.

## Features

Home Page show digest of session history. Show the public information.

User can see all the session records they created, in a private view.

## App Version 1

- Home Page, describes what the app is, brief instruction.
- Sign Up Page
- Sign In Page
- View Past Sessions
- Create/Log a New Session.
- Log Session Form
    -   Attributes that are saved in a session
    -   New People Encountered
    -   Hit Points


## Version Next
- Create Campaign
- Join Campaign

## Before First In Person Work Session
- Install Create React App, get working in Local Development Environment.

# We Chatting App

## Table of contents

- [Overview](#overview)
- [Description](#description)
- [Built with](#built-with)
- [Features](#features)
- [Setup](#setup)

## Overview

A real-time chat application built with React and Socket.io, allowing users to sign up with email verification and chat in real-time with other users. The app provides online status tracking, message delivery/read status, and seamless state management using Context API and `useReducer`.

## Built with

- **React Js**: JavaScript library for building user interfaces.
- **Socket.io**: Enables real-time, bidirectional communication between clients and servers.
- **Context API**: React's built-in state management solution.
- **useReducer**: A React hook for managing complex state logic.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.

## Features

- **Email Verification**: Users sign up with an email, receive a verification code, and log in after successful verification.
- **Real-Time Chat**: Instant messaging powered by Socket.io for real-time communication.
- **Search for Users**: Easily search for other users to start a conversation.
- **Online Status**: Shows online users in the chat interface when they are active.
- **Message Status**: Track when messages are delivered, seen, or when a user disconnects.
- **State Management**: Context API and `useReducer` are used to manage the application's global state efficiently.

## Setup

To run this project, install it locally using npm:

```
$ npm install
$ npm run dev
```

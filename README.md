# Workshop (CG - S2024/032 Team Building)

## Overview

This project contains proof of work with supabase auth, supabase subscriptions. Utilize react framework and all necessary libraries to make it work
User can authorize with email and password.
User can create tasks, update tasks, delete tasks. Tasks on board will be auto-synced between all authenticated customers
User can update and delete only own tasks. To edit title or description user need to double-click on title or description
Users can write messages to the chat. Be default, if there any messages, user will see last 50 messages in the chat.

## How to start

1. Clone this project
1. Run `npm i`
1. Run `npm start`
1. Open [http://localhost:3000](http://localhost:3000)

## Summary

Technical stack for this project:

- React - base front-end framework
- supabase - framework that allow to create almost whole project without backend
- shadcn (with radix ui) - ui framework that allow to build simple and clean UI interfaces pretty fast.
- tailwind - css framework for fast prototyping
- luxon - library for handling and formatting dates
- react-hook-form - good forms framework that allow to create forms easy and fast
- zod - allow to make validations for data
- @hookform/resolvers - connect react-hook-form and zod
- react-hot-toast - simple toasts for app
- axios - "fetch" on steroids, have a lot of configurations, easy syntax
- react-query - great library for managing server state, loading and error state for each request

## Supabase DB schema

![alt text](<images/CleanShot 2024-03-01 at 19.49.42.png>)
![alt text](<images/CleanShot 2024-03-01 at 19.50.29.png>)
![alt text](<images/CleanShot 2024-03-01 at 19.51.07.png>)

# ProcrastinatorApp Server

## Table of Contents

- [Introduction](#introduction)
- [Tech Stack](#tech-stack)
- [Data Endpoints](#data-endpoints)

## Introduction

This is the server documentation for [Procrastinator App](https://procrastinator.netlify.app/), a web app to browse and bookmark posts from various news and media sites.

## Tech Stack

> The server is powered by

- Node
- Express
- Postgresql
- BCryptJS
- JSONWebToken

## Data Endpoints

All requests and responses are in JSON format.

| Data           | Path                                                  |
| -------------- | ----------------------------------------------------- |
| All Posts      | https://procrastinator-api.herokuapp.com/allposts     |
| Reddit         | https://procrastinator-api.herokuapp.com/reddit       |
| Hacker News    | https://procrastinator-api.herokuapp.com/hackernews   |
| Product Hunt   | https://procrastinator-api.herokuapp.com/producthunt  |
| New York Times | https://procrastinator-api.herokuapp.com/newyorktimes |

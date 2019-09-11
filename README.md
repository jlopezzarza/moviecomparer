# Movie Comparer

[![Build Status](https://travis-ci.org/jlopezzarza/moviecomparer.svg?branch=master)](https://travis-ci.org/jlopezzarza/moviecomparer)

The objective of the website is to be able to compare two movies or tv shows
and match the cast appearing in both titles.

Many thanks to the folks of https://www.themoviedb.org/ for providing that awesome
API!

## Development

The backend is a basic API written in Golang and the frontend is written in ReactJS.

To ease the development process I've been using docker-compose to run all the
services.

In order to run correctly, you need to specify a `.env` file with a TMDB_KEY
variable containing the API token to connect to https://api.themoviedb.org


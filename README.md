# Movie Comparer!

The objective of the project is to be able to compare two movies or tv shows
and match the cast appearing in both titles.

Thanks to the folks of https://www.themoviedb.org/ for providing that awesome
API!

## Development

The backend is a basic API in Golang and the frontend is created with ReactJS.

To ease the development process I've been using docker-compose to run all the
services.

In order to run correctly, you need to specify a `.env` file with a TMDB_KEY
variable containing the API token to connect to https://api.themoviedb.org

## Production

The code is deployed in a Kubernetes cluster on GKE. To see the results, you
can visit http://moviecomparer.com

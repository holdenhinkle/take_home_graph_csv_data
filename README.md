# Tech Challenge
The application should have the ability to:
- Upload a CSV file
- List uploaded CSV files
- Download the previously uploaded CSV file
- Display the CSV content showing at least all column headers and content
- Provide statistics on the number of people with the same year in the “date” field.

The application should be comprised of both a frontend and a backend. The frontend must have at least three buttons, allowing for upload download and date statistics.

More:
- The application can be written in any language
- The CSV will be comma delimited
- The CSV file may contain empty string in the ‘state’ column. In this case, fill in with the text “BLANK” instead
- The application should be able to run on any machine

# Solution
## Project setup
The Express API is in the root directory.

The React app is in the client directory.

Create an `uploads` in the foot directory:
- In the root directory run `mkdir uploads`

Install the dependencies:
- In the root directory run `npm install`
- `cd` into `clients`
- In the clients directory and run `npm install`

## Run
In the root directory, run `PORT=3001 npm start` to start the express API on port 3001.

In the clients directory, run `npm start` to start the React app on port 3000. Requests will be proxied to the Express API.

## Sample CSV Files
Sample `csv` files are in the `sample_csvs` directory.

## API
The following RESTful API endpoints are available:
```
get  /api/files
get  /api/files/:id
get  /api/files/:id/download/
post /api/files
```

`get` `/api/files/:id` takes optional query params for `limit` and `offset`

## To-dos
- Cache parsed csv files
- Write tests for the api
- Write tests for the frontend
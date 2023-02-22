
const express = require('express');
const cors = require('cors');

const PORT = process.env.PORT || 5000;
const app = express();

const sqlsrv = require('mssql/msnodesqlv8');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let config = {
  user: '',
  password: '',
  database: '',
  server: '',
  driver: 'msnodesqlv8',
};

sqlsrv.connect(config, err => {
  
  if ( err ) {
    console.log(err);
  }

  let request = new sql.Request();

  request.query('SELECT * FROM users', (err, data) => {
    if ( err ) {
      console.log(err);
    } else {
      app.get('/', (request, response) => {
        response.json(data.recordset);
      });
    }
  });

});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

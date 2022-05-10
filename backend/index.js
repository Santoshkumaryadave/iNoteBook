const connectToMongo= require("./DB");
const express = require('express');
const cors = require('cors');

connectToMongo();

const app = express()
const port = 5000

app.use(express.json());
app.use(cors())

//Avalable Routs
app.use('/api/aurth',require ('./Routes/aurth') )
app.use('/api/notes',require ('./Routes/notes') )

app.listen(port, () => {
  console.log(`iNoteBook Backend app listening on port ${port}`)
})
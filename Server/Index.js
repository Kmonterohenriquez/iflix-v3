const express = require("express");
const app = express();


app.use(express.json());
app.use(express.static(`${__dirname}/../build`));

const port = 4005;
app.listen(port, () => console.log(`Server running on port ${port}`));

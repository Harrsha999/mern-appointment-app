// backend/server.js

// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const appointmentRoutes = require('./routes/appointment');

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(cors());
// app.use(bodyParser.json());
// app.use('/appointments', appointmentRoutes);

// app.listen(port, () => {
//     console.log(`Server running on port ${port}`);
// });
// backend/server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const appointmentRoutes = require('./routes/appointment');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use('/appointments', appointmentRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


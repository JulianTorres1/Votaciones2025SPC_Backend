const express = require('express');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const logger = require('./logger');
const path = require("path"); // Asegura que el módulo path esté importado


// Routes import
//const userRoutes = require('./routes/users');
const logRoutes = require('./routes/log');
//const validationRoutes = require('./routes/validation');
const routes = require('./routes');
//const solicitudes = require('./routes/solicitudes');
//const User = require('./routes/users');
const votaciones = require('./routes/votaciones');

// Middlewares import
const authenticate = require('./middlewares/authenticate');
const disabled = require('./middlewares/disabled');

// Application
const app = express();

app.use("/public", express.static(path.join(__dirname, "public")));


// Rate limiting middleware
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// Apply rate limiting to all requests
app.use(limiter);

// Enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root url
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'operational',
        message: 'Votaciones Salesianas API is running',
        version: '1.0.0'
    });
});

// Those routes are only examples routes to inspire you or to get you started faster.
// You are not forced to use them, and can erase all routes in order to make your own.
// Nested routes (routes are stored in the routes folder)

app.use('/votaciones', votaciones);


const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    // logger.info(`Server is running on port ${PORT}`); Use this line if you want to log the startup
});

// backend/config.js

// module.exports = {
//     emailUser: 'harrsha.code@gmail.com',
//     emailPass: 'Harrsha@37'
// };

// backend/config.js

require('dotenv').config();

module.exports = {
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS
};

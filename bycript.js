const bcrypt = require('bcryptjs');

const password = '1234567890';

bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
        console.error(err);
    } else {
        console.log('Bcrypt hash:', hash);
    }
});

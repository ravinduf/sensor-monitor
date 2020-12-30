const express = require('express');
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();
const User = require('../models/user');
const config = require('config');

router.post('/', [
    check('name', 'Name is Required').not().isEmpty(),
    check('email', 'Please enter valid email').isEmail(),
    check('number', "Phone number is required").isEmpty(),
    check('password', 'Please enter a password with 6 or more').isLength({ min: 6 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, number, password } = req.body;

    try {
        let user = await User.findOne({ email: email });
        if (user) {
            res.status(400).json({ errors: [{ msg: 'User exist' }] })
        }

        const avatar = gravatar.url(email, {
            s: '200',
            r: 'pg',
            d: 'mm'
        });

        user = new User({
            name,
            email,
            number,
            avatar,
            password
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({ token: token })
        });

    } catch (err) {
        console.error(err.toString());
        return res.status(500).send('Server error');
    }


});

module.exports = router;
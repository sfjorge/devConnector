const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Profile = require('../../model/Profile');
const User = require('../../model/User');

//@route   GET api/profile/me
//@desc    GET current users profile
//@access  Private --> will require auth to access protected token
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name', 'avatar']);

        if(!profile) {
            return res.status(500).json({ msg: 'There is no profile for this user'});
        }
        res.json(profile);
    } catch (err) {
        console.err(err.message);
        res.status(500).send('Servor Error');
    }
}); // simply need to add 'auth' parameter to secure route

module.exports = router;
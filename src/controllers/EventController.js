const Event = require('../models/Event');
const User = require('../models/User');

module.exports = {
    async createEvent(req, res) {
        const { title, description, price } = req.body;
        const { userId } = req.headers;
        const { filename } = req.file;

        const user_id = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: 'User does not exist!'
            })
        }

        const event = await Event.create({
            title,
            description,
            price,
            user: user_id,
            thumbnail: filename
        })

        return res.json(event);
    }
}
const { create } = require('../models/Registration');
const Registration = require('../models/Registration');

module.exports = {
    async create(req, res) {
        const { user_id } = req.header;
        const { event_id } = req.params;
        const { date } = req.body;

        const registration = await Registration.create({
            user: user_id,
            event: event_id,
            date
        })

        return res.json(registration);
    }
}
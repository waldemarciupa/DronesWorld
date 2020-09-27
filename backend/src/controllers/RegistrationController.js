const Registration = require('../models/Registration');
const jwt = required('jsonwebtoken');

module.exports = {
    async create(req, res) {
        jwt.verify(req.token, 'secret', async (err, authData) => {
            if (err) {
                res.sendStatus(401);
            } else {
                const user_id = authData.user._id;
                const { eventId } = req.params;
                const { date } = req.body;

                const registration = await Registration.create({
                    user: user_id,
                    event: eventId,
                    date
                })

                await registration
                    .populate('event')
                    .populate('user', '-password')
                    .execPopulate();

                const ownerSocket = req.connectedUsers[registration.event.user]

                return res.json(registration);
            }
        })
    },

    async getRegistration(req, res) {
        const { registration_id } = req.params;

        try {
            const registration = await Registration.findById(registration_id);
            await registration
                .populate('event')
                .populate('user', '-password')
                .execPopulate();

            return res.json(registration);
        } catch (error) {
            return res.status(400).json({ message: 'Registration not found' })
        }
    }
}
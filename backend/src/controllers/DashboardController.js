const Event = require('../models/Event');
const jwt = require('jsonwebtoken');

module.exports = {
    getEventById(req, res) {
        jwt.verify(req.token, 'secret', async (err, authData) => {
            if (err) {
                res.sendStatus(403);
            } else {
                const { eventId } = req.params;
                try {
                    const event = await Event.findById(eventId);

                    if (event) {
                        return res.json({ authData, events })
                    }
                } catch (error) {
                    return res.status(400).json({
                        message: 'Event does not exist!'
                    })
                }
            }
        })
    },

    getAllEvents(req, res) {
        jwt.verify(req.token, 'secret', async (err, authData) => {
            if (err) {
                res.sendStatus(401);
            } else {
                const { sport } = req.params;
                const query = sport ? { sport } : {};

                try {
                    const events = await Event.find(query);

                    if (events) {
                        return res.json({ authData, events })
                    }
                } catch (error) {
                    return res.status(400).json({
                        message: 'We do not have any event yet, sorry!'
                    })
                }
            }
        })
    },

    async getAllEventsByUserId(req, res) {
        const { user_id } = req.headers;

        try {
            const events = await Event.find({ user: user_id });

            if (events) {
                return res.json(events)
            }
        } catch (error) {
            return res.status(400).json({
                message: 'We do not have any event with the user_id, sorry!'
            })
        }
    }
}
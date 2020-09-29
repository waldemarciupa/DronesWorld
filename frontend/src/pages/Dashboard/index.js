import React, { useEffect, useState, useMemo } from 'react';
import api from '../../services/api';
import moment from 'moment';
import socketio from 'socket.io-client';
import './dashboard.css';
import { Button, ButtonGroup, Alert } from 'reactstrap';

// Dashboard willl show all events
export default function Dashboard({ history }) {
    const [events, setEvents] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [messageHandler, setMessageHandler] = useState('');
    const [eventsRequests, setEventsRequests] = useState([]);

    const user = localStorage.getItem('user');
    const user_id = localStorage.getItem('user_id');

    const getEvents = async (filter) => {
        try {
            const url = filter ? `/dashboard/${filter}` : '/dashboard';
            const response = await api.get(url, { headers: { user: user } });
            setEvents(response.data.events);
        } catch (error) {
            history.push('/login');
        }
    };

    const handleFilter = (query) => {
        setRSelected(query);
        getEvents(query);
    }

    const handleEventsByUserId = async () => {
        try {
            setRSelected('myevents');
            const response = await api.get('/user/events', { headers: { user: user } });

            setEvents(response.data.events);
        } catch (error) {
            history.push('/login');
        }

    }

    const handleDeleteEvent = async (eventId) => {

        try {
            const deleteEvent = await api.delete(`/event/${eventId}`, { headers: { user: user } })
            setSuccess(true);
            setMessageHandler('The event was deleted succesfully');
            setTimeout(() => {
                setSuccess(false);
                handleFilter(null);
                setMessageHandler('');
            }, 2000);

        } catch (error) {
            setError(true);
            setMessageHandler('Error when deleting event!');
            setTimeout(() => {
                setError(false)
                setMessageHandler('');
            }, 2000);
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('user_id');
        history.push('/login');
    }

    const handleRegistrationRequest = async (event) => {
        try {
            await api.post(`/registration/${event.id}`, {}, { headers: { user } })

            setSuccess(true);
            setMessageHandler(`The request for the event ${event.title} was succesfully`);
            setTimeout(() => {
                setSuccess(false);
                handleFilter(null);
                setMessageHandler('');
            }, 2000);
        } catch (error) {
            setError(true);
            setMessageHandler(`The request for the event ${event.title} failed`);
            setTimeout(() => {
                setError(false)
                setMessageHandler('');
            }, 2000);
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

    const socket = useMemo(
        () =>
            socketio('http://localhost:8000/', { query: { user: user_id } }),
        [user_id]
    );

    useEffect(() => {
        socket.on('registration_request', data => (setEventsRequests([...eventsRequests, data])))
    }, [eventsRequests, socket]);

    return (
        <>
            <ul className="notification">
                {eventsRequests.map(event => {
                    return (
                        <li key={event._id}>
                            <p>
                                <strong>{event.user.email}</strong> Is requesting to register to your event
                                <strong>{event.title}</strong>
                                <Button color="secondary" onClick={() => history.push('events')} >Add Event</Button>
                                <Button color="danger" onClick={handleLogout} >Logout</Button>
                            </p>
                        </li>
                    )
                })}
            </ul>
            <div className="filter-panel">
                <ButtonGroup>
                    <Button
                        color="primary"
                        onClick={() => handleFilter(null)}
                        active={rSelected === null}>All</Button>
                    <Button
                        color="primary"
                        onClick={handleEventsByUserId}
                        active={rSelected === 'myevents'}>My events</Button>
                    <Button
                        color="primary"
                        onClick={() => handleFilter('running')}
                        active={rSelected === 'Running'}>Running</Button>
                    <Button
                        color="primary"
                        onClick={() => handleFilter('eSport')}
                        active={rSelected === 'eSport'}>eSport</Button>
                    <Button
                        color="primary"
                        onClick={() => handleFilter('Swimming')}
                        active={rSelected === 'Swimming'}>Swimming</Button>
                    <Button
                        color="primary"
                        onClick={() => handleFilter('Cycling')}
                        active={rSelected === 'Cycling'}>Cycling</Button>
                </ButtonGroup>
                <ButtonGroup>
                    <Button color="secondary" onClick={() => history.push('events')} >Add Event</Button>
                    <Button color="danger" onClick={handleLogout} >Logout</Button>
                </ButtonGroup>
            </div>
            <ul className="events-list">
                {events.map(event => (
                    <li key={event._id}>
                        <header style={{ backgroundImage: `url(${event.thumbnail_url})` }} >
                            {event.user === user_id ?
                                <div>
                                    <Button
                                        size="sm"
                                        color="danger"
                                        onClick={() => handleDeleteEvent(event._id)}
                                    >
                                        Delete
                                    </Button>
                                </div> : ''}
                        </header>
                        <strong>{event.title}</strong>
                        <span>Event date: {moment(event.date).format('LL')}</span>
                        <span>Event price: {parseFloat(event.price).toFixed(2)}</span>
                        <span>Event description: {event.description}</span>
                        <Button color="primary" onClick={() => handleRegistrationRequest(event)}>Registration request</Button>
                    </li>
                ))}
            </ul>
            {error ? (
                <Alert className="event-validation" color="danger">{messageHandler}</Alert>
            ) : ""}
            {success ? (
                <Alert className="event-validation" color="success">{messageHandler}</Alert>
            ) : ""}
        </>
    )
}
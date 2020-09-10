import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import moment from 'moment';
import './dashboard.css';
import { Button, ButtonGroup } from 'reactstrap';

// Dashboard willl show all events
export default function Dashboard({ history }) {
    const [events, setEvents] = useState([]);
    const [cSelected, setCSelected] = useState([]);
    const [rSelected, setRSelected] = useState(null);
    const user_id = localStorage.getItem('user');

    const getEvents = async (filter) => {
        const url = filter ? `/dashboard/${filter}` : '/dashboard';
        const response = await api.get(url, { headers: { user_id } });

        setEvents(response.data);
    };

    const handleFilter = (query) => {
        setRSelected(query);
        getEvents(query);
    }

    const handleMyEvents = () => {
        setRSelected('myevents');
    }

    useEffect(() => {
        getEvents();
    }, [])

    console.log(events);
    return (
        <>
            <div className="filter-panel">
                <ButtonGroup>
                    <Button
                        color="primary"
                        onClick={() => handleFilter(null)}
                        active={rSelected === null}>All</Button>
                    <Button
                        color="primary"
                        onClick={handleMyEvents}
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
                <Button color="info" onClick={() => history.push('events')} >Add Event</Button>
            </div>
            <ul className="events-list">
                {events.map(event => (
                    <li key={event._id}>
                        <header style={{ backgroundImage: `url(${event.thumbnail_url})` }} />
                        <strong>{event.title}</strong>
                        <span>Event date: {moment(event.date).format('LL')}</span>
                        <span>Event price: {parseFloat(event.price).toFixed(2)}</span>
                        <span>Event description: {event.description}</span>
                        <Button color="primary">Subscribe</Button>
                    </li>
                ))}
            </ul>
        </>
    )
}
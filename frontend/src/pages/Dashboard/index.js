import React, { useEffect, useState } from 'react';
import api from '../../services/api';

// Dashboard willl show all events
export default function Dashboard() {
    const [events, setEvents] = useState([]);
    const user_id = localStorage.getItem('user');

    const getEvents = async (filter) => {
        const url = filter ? `/dasboard/${filter}` : '/dashboard';
        const response = await api.get(url, { headers: { user_id } });

        setEvents(response.data);
    };

    useEffect(() => {
        getEvents();
    }, [])

    console.log(events);
    return (
        <div>
            Hello from Dashboard
        </div>
    )
}
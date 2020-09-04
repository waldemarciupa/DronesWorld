import React, { useState } from 'react';

// Events willl show all events

// title: String,
// description: String,
// price: Number,
// thumbnail: String,
// date: Date,
// sport: String,

export default function EventsPage() {
    const user_id = localStorage.getItem('user');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [date, setDate] = useState('');

    return (
        <div>
            Hello from Events
        </div>
    )
}
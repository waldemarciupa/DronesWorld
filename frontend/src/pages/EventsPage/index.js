import React, { useState, useMemo } from 'react';
import api from '../../services/api'
import { Button, Form, FormGroup, Label, Input, Container, } from 'reactstrap';
import CameraIcon from '../../assets/camera.png';
import './events.css';

// Events willl show all events
export default function EventsPage() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [date, setDate] = useState('');
    const [sport, setSport] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const user_id = localStorage.getItem('user');
        const eventData = new FormData;

        eventData.append("thumbnail", thumbnail);
        eventData.append("sport", sport);
        eventData.append("title", title);
        eventData.append("price", price);
        eventData.append("description", description);
        eventData.append("date", date);


        try {
            if (title !== "" &&
                description !== "" &&
                price !== "" &&
                sport !== "" &&
                date !== "" &&
                thumbnail !== null
            ) {
                await api.post('/event', eventData, { headers: { user_id } })
            } else {
                setErrorMessage(true);
                setTimeout(() => {
                    setErrorMessage(false)
                }, 2000);
                console.log('Missing required data');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <h1>Create your Event</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Upload Image: </Label>
                    <Label id='thumbnail' style={{ backgroundImage: `url(${preview})` }}
                        className={thumbnail ? 'has-thumbnail' : ''}>
                        <Input
                            type="file"
                            onChange={(event) => setThumbnail(event.target.files[0])}
                        />
                        <img
                            src={CameraIcon}
                            style={{ maxWidth: "50px" }}
                            alt="upload icon image"
                        />
                    </Label>
                </FormGroup>
                <FormGroup>
                    <Label>Sport: </Label>
                    <Input
                        id="sport"
                        type="text"
                        value={sport}
                        placeholder="Sport name"
                        onChange={(event) => setSport(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Title: </Label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        placeholder="Event Title"
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Description: </Label>
                    <Input
                        id="description"
                        type="text"
                        value={description}
                        placeholder="Event Description"
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Price: </Label>
                    <Input
                        id="price"
                        type="text"
                        value={price}
                        placeholder="Event Price"
                        onChange={(event) => setPrice(event.target.value)}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Date: </Label>
                    <Input
                        id="date"
                        type="date"
                        value={date}
                        placeholder="Event Date"
                        onChange={(event) => setDate(event.target.value)}
                    />
                </FormGroup>
                <Button type="submit">
                    Create Event
                </Button>
            </Form>
            {errorMessage ? (
                <div>Missing required information</div>
            ) : ""}
        </Container>
    )
}
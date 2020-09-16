import React, { useState, useEffect, useMemo } from 'react';
import api from '../../services/api'
import { Button, Form, FormGroup, Label, Input, Container, Alert, ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import CameraIcon from '../../assets/camera.png';
import './events.css';

export default function EventsPage({ history }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [date, setDate] = useState('');
    const [sport, setSport] = useState('Choose Sport');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [dropdownOpen, setOpen] = useState(false);
    const user = localStorage.getItem('user');

    useEffect(() => {
        if (!user) history.push('/login')
    }, [])

    const toggle = () => setOpen(!dropdownOpen);

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const eventData = new FormData();

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
                sport !== "Choose Sport" &&
                date !== "" &&
                thumbnail !== null
            ) {
                await api.post('/event', eventData, { headers: { user } });
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                    history.push('/')
                }, 3000);
            } else {
                setError(true);
                setTimeout(() => {
                    setError(false)
                }, 2000);
                console.log('Missing required data');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleSportEvent = (sport) => {
        setSport(sport)
    }
        ;

    return (
        <Container>
            <h1>Create your Event</h1>
            <Form onSubmit={handleSubmit}>
                <div className="input-group">
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
                    <FormGroup style={{ display: 'grid' }}>
                        <Label>Sport: </Label>
                        <ButtonDropdown
                            isOpen={dropdownOpen}
                            toggle={toggle}
                        >
                            <DropdownToggle caret color="primary">
                                {sport}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => {
                                    handleSportEvent('Running')
                                }}>Running</DropdownItem>
                                <DropdownItem onClick={() => {
                                    handleSportEvent('Cycling')
                                }}>Cycling</DropdownItem>
                                <DropdownItem onClick={() => {
                                    handleSportEvent('Swimming')
                                }}>Swimming</DropdownItem>
                                <DropdownItem onClick={() => {
                                    handleSportEvent('eSport')
                                }}>eSport</DropdownItem>
                            </DropdownMenu>
                        </ButtonDropdown>
                    </FormGroup>
                </div>
                <FormGroup>
                    <Button className="submit-btn" type="submit">
                        Create Event
                </Button>
                </FormGroup>
                <FormGroup>
                    <Button
                        onClick={() => history.push('/')}
                        className="secondary-btn"
                        type="submit">
                        Cancel
                </Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert className="event-validation" color="danger">Missing required information</Alert>
            ) : ""}
            {success ? (
                <Alert className="event-validation" color="success">The event was created succesfully</Alert>
            ) : ""}
        </Container>
    )
}
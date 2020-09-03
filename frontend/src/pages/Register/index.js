import React, { useState } from 'react';
import api from '../../services/api';
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';

export default function Register({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(email, password, firstName, lastName);

        const response = await api.post('/login', { email, password, firstName, lastName });

        const userId = response.data._id || false;

        if (userId) {
            localStorage.setItem('user', userId)
            history.push('/dashboard')
        } else {
            const { message } = response.data
            console.log(message
            );
        }
    }

    return (
        <Form onSubmit={handleSubmit}>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="First Name"
                    onChange={event => setFirstName(event.target.value)}
                />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Last Name"
                    onChange={event => setLastName(event.target.value)}
                />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    onChange={event => setEmail(event.target.value)}
                />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    onChange={event => setPassword(event.target.value)}
                />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}
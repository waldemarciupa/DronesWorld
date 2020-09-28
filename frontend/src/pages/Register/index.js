import React, { useState } from 'react';
import api from '../../services/api';
import { Button, Form, FormGroup, Label, Input, Container, Alert } from 'reactstrap';

export default function Register({ history }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();

        if (email !== "" &&
            password !== "" &&
            firstName !== "" &&
            lastName !== ""
        ) {
            const response = await api.post('/user/register', { email, password, firstName, lastName });
            const user = response.data.user || false;
            const user_id = response.data.user_id || false;

            if (user && user_id) {
                localStorage.setItem('user', user)
                localStorage.setItem('user_id', user_id)

                history.push('/')
            } else {
                const { message } = response.data
                setError(true);
                setErrorMessage(message);
                setTimeout(() => {
                    setError(false);
                    setErrorMessage('');
                }, 3000);
            }
        } else {
            setError(true);
            setErrorMessage("You need to field all the inputs");
            setTimeout(() => {
                setError(false);
                setErrorMessage('');
            }, 3000);
        }

    }

    return (
        <Container>
            <h2>Register</h2>
            <p>Please <strong>register</strong> for a new account</p>
            <Form onSubmit={handleSubmit}>
                <div className='input-group'>
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
                </div>
                <FormGroup>
                    <Button className="submit-btn">Submit</Button>
                </FormGroup>
                <FormGroup>
                    <Button
                        className='secondary-btn'
                        onClick={() => {
                            history.push('/login')
                        }}>Login</Button>
                </FormGroup>
            </Form>
            {error ? (
                <Alert
                    className="event-validation"
                    color="danger"
                >{errorMessage}</Alert>
            ) : ""}
        </Container>
    )
}
import React, { useState } from 'react';
import api from '../../services/api';
import { Button, Form, FormGroup, Label, Input, } from 'reactstrap';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <Form >
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email" />
            </FormGroup>
            <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                <Input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password" />
            </FormGroup>
            <Button>Submit</Button>
        </Form>
    )
}
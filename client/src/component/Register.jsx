import { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

// eslint-disable-next-line react/prop-types
export default function Register({ onSuccess }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const toast = useRef(null);

    const handleSubmit = () => {
        if (validateForm()) {
            setName('');
            setEmail('');
            setPassword('');
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Registered Successfully' });
            onSuccess();
        }
    };

    const validateForm = () => {
        let valid = true;

        if (!name) {
            setNameError('Name is required.');
            valid = false;
        } else {
            setNameError('');
        }

        if (!email) {
            setEmailError('Email is required.');
            valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is invalid.');
            valid = false;
        } else {
            setEmailError('');
        }

        if (!password) {
            setPasswordError('Password is required.');
            valid = false;
        } else {
            setPasswordError('');
        }

        return valid;
    };

    return (
        <div className="p-fluid">
            <Toast ref={toast} />
            <div className="field">
                <label htmlFor="name">Name</label>
                <InputText
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={nameError ? 'p-invalid' : ''}
                />
                {nameError && <small className="p-error">{nameError}</small>}
            </div>
            <div className="field">
                <label htmlFor="email">Email</label>
                <InputText
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? 'p-invalid' : ''}
                />
                {emailError && <small className="p-error">{emailError}</small>}
            </div>
            <div className="field">
                <label htmlFor="password">Password</label>
                <Password
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={passwordError ? 'p-invalid' : ''}
                />
                {passwordError && <small className="p-error">{passwordError}</small>}
            </div>
            <Button label="Submit" onClick={handleSubmit} />
        </div>
    );
}

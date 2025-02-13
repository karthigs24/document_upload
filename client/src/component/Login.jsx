// Login.jsx
import  { useState, useRef } from 'react';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

// eslint-disable-next-line react/prop-types
export default function Login({ onSuccess }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const toast = useRef(null);

    const handleSubmit = () => {
        if (validateForm()) {
            onSuccess();
            setEmail('');
            setPassword('');
            toast.current.show({ severity: 'success', summary: 'Success', detail: 'Logged In Successfully' });
        }
    };

    const validateForm = () => {
        let valid = true;
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
                <label htmlFor="login-email">Email</label>
                <InputText
                    id="login-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? 'p-invalid' : ''}
                />
                {emailError && <small className="p-error">{emailError}</small>}
            </div>
            <div className="field">
                <label htmlFor="login-password">Password</label>
                <Password
                    id="login-password"
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
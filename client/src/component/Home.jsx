import { useState, useRef } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';
import Register from './Register';
import Login from './Login';
import Document from './DocumentUpload';
import './home.css';

export default function Home() {
    const [isRegisterVisible, setIsRegisterVisible] = useState(false);
    const [isLoginVisible, setIsLoginVisible] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Add isLoggedIn state
    const toast = useRef(null);
    const showSuccess = (message) => {
        toast.current.show({ severity: 'success', summary: 'Success', detail: message });
    };
    const handleRegisterSuccess = () => {
        setIsRegisterVisible(false);
        showSuccess('Registered Successfully');
        setIsLoginVisible(true); 
    };
    const handleLoginSuccess = () => {
        setIsLoginVisible(false); 
        setIsLoggedIn(true); 
        showSuccess('Logged In Successfully');
    };
    return (
        <div className="container">
            {isLoggedIn ? (
                <Document /> 
            ) : (
                <div className="card">
                    <h1 className="text-center">Home Page</h1>
                    <div className="button-container mt-3">
                        <Button
                            label="Register"
                            icon="pi pi-user"
                            onClick={() => setIsRegisterVisible(true)}
                            className="p-button-raised p-button-rounded"
                        />
                        <Button
                            label="Login"
                            icon="pi pi-sign-in"
                            onClick={() => setIsLoginVisible(true)}
                            className="p-button-raised p-button-rounded"
                        />
                    </div>
                </div>
            )}
            <Dialog
                header="Register"
                visible={isRegisterVisible}
                style={{ width: '50vw' }}
                onHide={() => setIsRegisterVisible(false)}
            >
                <Register onSuccess={handleRegisterSuccess} />
            </Dialog>
            <Dialog
                header="Login"
                visible={isLoginVisible}
                style={{ width: '50vw' }}
                onHide={() => setIsLoginVisible(false)}
            >
                <Login onSuccess={handleLoginSuccess} />
            </Dialog>
            <Toast ref={toast} />
        </div>
    );
}
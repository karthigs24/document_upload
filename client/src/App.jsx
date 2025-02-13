// App.jsx
import { useState } from 'react';
import Login from './Login';
import Document from './Document';

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div>
            {isLoggedIn ? <Document /> : <Login onSuccess={handleLoginSuccess} />}
        </div>
    );
}
import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useRef(null)
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:3000/login', {
        email, // Ensure this matches the backend schema
        password,
      })

      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'User logged in successfully',
        life: 3000,
      })

      console.log('User logged in:', response.data)
      navigate('/document-upload')
    } catch (error) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : 'An error occurred'

      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 3000,
      })

      console.error('Error logging in user:', error)
    }
  }

  return (
    <div className="p-fluid p-formgrid p-grid">
      <Toast ref={toast} />
      <div className="p-field p-col-12">
        <label htmlFor="username">Username</label>
        <InputText
          id="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="p-field p-col-12">
        <label htmlFor="password">Password</label>
        <Password
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <Button label="Login" icon="pi pi-sign-in" onClick={handleLogin} />
    </div>
  )
}

export default Login

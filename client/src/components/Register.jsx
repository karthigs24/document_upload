import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { InputText } from 'primereact/inputtext'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { Toast } from 'primereact/toast'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const toast = useRef(null)
  const navigate = useNavigate()

  const handleRegister = async () => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/auth/register',
        {
          username,
          email,
          password,
        }
      )
      toast.current.show({
        severity: 'success',
        summary: 'Success',
        detail: 'User registered successfully',
        life: 3000,
      })
      console.log('User registered:', response.data)
      navigate('/document-upload')
    } catch (error) {
      toast.current.show({
        severity: 'error',
        summary: 'Error',
        detail: error.response.data.message,
        life: 3000,
      })
      console.error('Error registering user:', error)
    }
  }

  return (
    <div className="p-fluid p-formgrid p-grid">
      <Toast ref={toast} />
      <div className="p-field p-col-12">
        <label htmlFor="username">Username</label>
        <InputText
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="p-field p-col-12">
        <label htmlFor="email">Email</label>
        <InputText
          id="email"
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
      <Button label="Register" icon="pi pi-user" onClick={handleRegister} />
    </div>
  )
}

export default Register

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from 'primereact/button'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="p-d-flex p-flex-column p-ai-center p-mt-5">
      <Button
        label="Register"
        icon="pi pi-user"
        className="p-button p-mb-2"
        onClick={() => navigate('/register')}
      />
      <Button
        label="Login"
        icon="pi pi-sign-in"
        className="p-button"
        onClick={() => navigate('/login')}
      />
    </div>
  )
}

export default Home

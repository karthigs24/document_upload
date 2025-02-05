import React from 'react'
import { Button } from 'primereact/button'

// eslint-disable-next-line react/prop-types
const ButtonComponent = ({ label, icon, iconPos, onClick, className }) => {
  return (
    <Button
      label={label}
      icon={icon}
      iconPos={iconPos}
      onClick={onClick}
      className={className}
    />
  )
}

export default ButtonComponent

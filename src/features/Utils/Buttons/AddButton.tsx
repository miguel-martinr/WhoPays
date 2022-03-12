import React from 'react'
import { Button, ButtonProps } from 'react-bootstrap'

// extends React.ButtonHTMLAttributes<HTMLButtonElement>
export interface AddButtonProps extends ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const AddButton = (props: AddButtonProps) => {
  return (
    <Button {...props}>
      Add +
    </Button>
  )
}

import React from 'react'

// extends React.ButtonHTMLAttributes<HTMLButtonElement>
export interface AddButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const AddButton = ({onClick}: AddButtonProps) => {
  return (
    <button onClick={onClick}>Add +</button>
  )
}

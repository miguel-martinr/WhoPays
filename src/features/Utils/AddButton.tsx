import React from 'react'

// extends React.ButtonHTMLAttributes<HTMLButtonElement>
export interface AddButtonProps {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export const AddButton = ({onClick, text}: AddButtonProps) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

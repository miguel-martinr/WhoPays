import React from 'react'
import { PayerProps } from '../../types/PayerProps'

export interface PayerComponentProps {
  payer: PayerProps,
  onChange?: (newValues: PayerProps) => void,
  readOnlyPays: boolean,
  readOnlyName: boolean,
}

export const Payer = ({payer, onChange, readOnlyPays, readOnlyName}: PayerComponentProps) => {
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    onChange({ ...payer, name: event.target.value });
  }

  // const onLinkedItemsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onChange({ ...payer, linkedItems: []});
  // }
  return (
    <>
    <input type="text" defaultValue={payer.name} onChange={onNameChange} readOnly={readOnlyName}/>
    <input type="number" defaultValue={payer.ammountToPay} readOnly={readOnlyPays}/>
    <button>Link item</button>
    </>
  )
}

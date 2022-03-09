import React from 'react'
import { useNewPayer } from '../../app/hooks'



export const Payer2 = () => {


  const [payer, updatePayer] = useNewPayer();

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updatePayer({ ...payer, name: event.target.value });
  }

  // const onLinkedItemsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onChange({ ...payer, linkedItems: []});
  // }
  return (
    <>
    <input type="text" defaultValue={payer.name} onChange={onNameChange}/>
    <input type="number" defaultValue={payer.ammountToPay}/>
    <button>Link item</button>
    </>
  )
}

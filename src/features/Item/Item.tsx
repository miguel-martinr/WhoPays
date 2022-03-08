import React from 'react'
import { ItemProps } from '../../types/ItemProps';


export interface ItemComponentProps {
  item: ItemProps,
  onChange?: (newValues: ItemProps) => void,
  readOnly: boolean,
}

export const Item = ({item, onChange, readOnly}: ItemComponentProps) => {
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    onChange({ ...item, name: event.target.value });
  }

  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    onChange({ ...item, price: parseInt(event.target.value) });
  }

  // const onLinkedPayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onChange({ ...item, linkedPayers: []});
  // }
  return (
    <>
    <input type="text" defaultValue={item.name} onChange={onNameChange}/>
    <input type="number" defaultValue={item.price} onChange={onPriceChange} readOnly={readOnly}/>
    <button>Link payer</button>
    </>
  )
}

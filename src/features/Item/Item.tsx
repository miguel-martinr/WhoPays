import React from 'react'
import { useAppDispatch } from '../../app/hooks';
import { ItemProps } from '../../types/ItemProps';
import { updateItem } from '../state/whoPaysSlice';


export interface ItemComponentProps {
  item: ItemProps,
}

export const Item = ({ item }: ItemComponentProps) => {
  const dispatch = useAppDispatch();
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateItem({ ...item, name: event.target.value }));
  }

  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateItem({ ...item, price: parseInt(event.target.value) }));
  }

  // const onLinkedPayersChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   onChange({ ...item, linkedPayers: []});
  // }
  return (
    <>
    <input type="text" defaultValue={item.name} onChange={onNameChange}/>
    <input type="number" defaultValue={item.price} onChange={onPriceChange} />
    <button>Link payer</button>
    </>
  )
}


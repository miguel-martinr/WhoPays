import React from 'react'
import { PayerNotFoundError } from '../../app/Errors';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { PayerProps } from '../../types/PayerProps';
import { updatePayer } from '../state/whoPaysSlice';

export interface PayerComponentProps {
  payer: PayerProps,
}


export const Payer = ({ payer }: PayerComponentProps) => {

  const dispatch = useAppDispatch();
  const payerInStore = useAppSelector(({ WhoPays }) => WhoPays.payers.find(p => p.id === payer.id));

  if (!payerInStore) throw new PayerNotFoundError(payer.id);

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updatePayer({ ...payerInStore, name: event.target.value }));
  };

  return (
    <>
    <input type="text" defaultValue={payer.name} onChange={onNameChange}/>
    <input type="number" defaultValue={payer.ammountToPay}/>
    <button>Link item</button>
    </>
  )
}

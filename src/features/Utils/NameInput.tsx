import { Action, ActionCreatorWithPayload } from '@reduxjs/toolkit';
import React from 'react'
import { Col } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { ItemProps } from '../../types/ItemProps';
import { PayerProps } from '../../types/PayerProps';
import { updateItem } from '../state/whoPaysSlice';

export type Updater = (itemOrPayer: ItemProps | PayerProps) => Action;

export interface GeneralInputProps {
  itemOrPayer: ItemProps | PayerProps,
  nameUpdater: any,
  children: React.ReactNode,
}


export const NameInput = ({ itemOrPayer, nameUpdater, children }: GeneralInputProps) => {
  const dispatch = useAppDispatch();


  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(nameUpdater({ ...itemOrPayer, name: event.target.value }));
  }

  return (
    <>
      <Col>
        <input type="text" defaultValue={itemOrPayer.name} onChange={onNameChange} />
      </Col>
      {children}
    </>
  )
}

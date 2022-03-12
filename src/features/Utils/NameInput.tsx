import { Action } from '@reduxjs/toolkit';
import React from 'react'
import { Col, Form } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { ItemProps } from '../../types/ItemProps';
import { PayerProps } from '../../types/PayerProps';

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
        <Form.Control
          type="text"
          placeholder="Name"
          onChange={onNameChange}
          defaultValue={itemOrPayer.name}
        />
      </Col>
      {children}
    </>
  )
}

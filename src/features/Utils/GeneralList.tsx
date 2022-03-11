import React from 'react'
import { ItemProps } from '../../types/ItemProps'
import { PayerProps } from '../../types/PayerProps'

export interface GeneralListProps {
  itemOrPayers: (ItemProps | PayerProps)[],
  cb: (itemOrPayer: ItemProps | PayerProps) => React.ReactNode
}

export const GeneralList = ({itemOrPayers, cb}: GeneralListProps) => {


  return (
    <>
      {
        itemOrPayers.map((itemOrPayer: ItemProps | PayerProps) => 
          <div key={itemOrPayer.id} className="mt-2">
            {cb(itemOrPayer)}
          </div>  
        )
      }
    </>
  )
}

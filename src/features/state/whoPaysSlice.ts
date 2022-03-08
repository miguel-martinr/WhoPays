import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemProps } from '../../types/ItemProps';
import { PayerProps } from '../../types/PayerProps';
import { LinkPayerToItemPayload } from '../../types/Payloads';



export interface WhoPaysState {
  payers: PayerProps[],
  items: ItemProps[],
  newPayer: PayerProps,
  newItem: ItemProps,
}

const initialState: WhoPaysState = {
  payers: [],
  items: [],
  newPayer: {name: '', ammountToPay: 0, linkedItems: []},
  newItem: {name: '', price: 0, linkedPayers: []},
};


export const whoPaysSlice = createSlice({
  name: 'WhoPays',
  initialState,
  
  reducers: {
    addPayer: (state, action: PayloadAction<PayerProps>) => {
      state.payers.push(action.payload);
    },

    addItem: (state, action: PayloadAction<ItemProps>) => {
      state.items.push(action.payload);
    },
    
    linkPayerToItem: (state, action: PayloadAction<LinkPayerToItemPayload>) => {
      const { payerName, itemName } = action.payload;
      
      const payer = state.payers.find(p => p.name === payerName);
      const item = state.items.find(i => i.name === itemName);

      if (!payer || !item) return;

      if (item.linkedPayers.includes(payer.name)) return;
    
      item.linkedPayers.push(payer.name);
      payer.linkedItems.push(item.name);

      const indexOfPayer = state.payers.findIndex(p => p.name === payer.name);
      state.payers.splice(indexOfPayer, 1, payer);

      const indexOfItem = state.items.findIndex(i => i.name === item.name);
      state.items.splice(indexOfItem, 1, item);
    },

    updateNewPayer: (state, action: PayloadAction<PayerProps>) => {
      state.newPayer = action.payload;
    },

    updateNewItem: (state, action: PayloadAction<ItemProps>) => {
      state.newItem = action.payload;
    },
  },
});

export const { linkPayerToItem, addPayer, addItem, updateNewPayer, updateNewItem } = whoPaysSlice.actions;
export default whoPaysSlice.reducer;

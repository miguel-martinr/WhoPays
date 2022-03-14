import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ItemNotFoundError, PayerNotFoundError } from '../../app/Errors';
import { ItemProps } from '../../types/ItemProps';
import { PayerProps } from '../../types/PayerProps';
import { LinkPayerToItemPayload } from '../../types/Payloads';



export interface WhoPaysState {
  payers: PayerProps[],
  items: ItemProps[],
  nextPayerId: number,
  nextItemId: number,
  payerBeingLinkedId: string,
}

const initialState: WhoPaysState = {
  payers: [],
  items: [],
  nextPayerId: 0,
  nextItemId: 0,
  payerBeingLinkedId: '',
};


export const whoPaysSlice = createSlice({
  name: 'WhoPays',
  initialState,

  reducers: {
    addPayer: (state, action: PayloadAction<PayerProps>) => {
      let { id, ...rest } = action.payload;

      state.payers.push({ id: `${state.nextPayerId}`, ...rest });
      state.nextPayerId++;
    },

    addItem: (state, action: PayloadAction<ItemProps>) => {
      let { id, ...rest } = action.payload;
      state.items.push({ id: `${state.nextItemId}`, ...rest });
      state.nextItemId++;
    },

    linkPayerToItem: (state, action: PayloadAction<LinkPayerToItemPayload>) => {
      const { payerId, itemId } = action.payload;

      const payer = state.payers.find(p => p.id === payerId);
      const item = state.items.find(i => i.id === itemId);

      if (!payer || !item) return; // Throw errors

      if (item.linkedPayers.includes(payer.id)) return; // Throw warning

      item.linkedPayers.push(payerId);
      payer.linkedItems.push(itemId);
  

      const indexOfPayer = state.payers.findIndex(p => p.id === payer.id);
      state.payers[indexOfPayer] = payer;

      const indexOfItem = state.items.findIndex(i => i.id === item.id);
      state.items[indexOfItem] = item;
    },

    unlinkPayerFromItem: (state, action: PayloadAction<LinkPayerToItemPayload>) => {
      const { payerId, itemId } = action.payload;

      const payer = state.payers.find(p => p.id === payerId);
      const item = state.items.find(i => i.id === itemId);

      if (!payer || !item) return; // Throw errors

      if (!item.linkedPayers.includes(payer.id)) return; // Throw warning

      item.linkedPayers = item.linkedPayers.filter(id => id !== payer.id);
      payer.linkedItems = payer.linkedItems.filter(id => id !== item.id);

      const indexOfPayer = state.payers.findIndex(p => p.id === payer.id);
      state.payers[indexOfPayer] = payer;

      const indexOfItem = state.items.findIndex(i => i.id === item.id);
      state.items[indexOfItem] = item;
    },

    updatePayer: (state, action: PayloadAction<PayerProps>) => {
      const indexOfPayer = state.payers.findIndex(p => p.id === action.payload.id);
      if (indexOfPayer === -1) throw new PayerNotFoundError(action.payload.id);
      state.payers.splice(indexOfPayer, 1, action.payload);
    },

    updateItem: (state, action: PayloadAction<ItemProps>) => {
      const indexOfItem = state.items.findIndex(i => i.id === action.payload.id);
      if (indexOfItem === -1) throw new ItemNotFoundError(action.payload.id);
      state.items.splice(indexOfItem, 1, action.payload);
    },

    setPayerBeingLinked: (state, action: PayloadAction<string>) => {
      state.payerBeingLinkedId = action.payload;
    },

    removePayer: (state, action: PayloadAction<string>) => { 
      const indexOfPayer = state.payers.findIndex(p => p.id === action.payload);
      if (indexOfPayer === -1) throw new PayerNotFoundError(action.payload);
      const payer = state.payers[indexOfPayer];
     
      // Unlink each item from the payer
      payer.linkedItems.forEach(itemId => {
        const indexOfItem = state.items.findIndex(i => i.id === itemId);
        if (indexOfItem === -1) throw new ItemNotFoundError(itemId); // Throw error

        const item = state.items[indexOfItem];        
        item.linkedPayers = item.linkedPayers.filter(id => id !== payer.id);
        state.items[indexOfItem] = item;
      });

      state.payers.splice(indexOfPayer, 1);
    },
  },
});

export const { linkPayerToItem,
  addPayer,
  addItem,
  updatePayer,
  updateItem,
  setPayerBeingLinked,
  removePayer,
  unlinkPayerFromItem } = whoPaysSlice.actions;
export default whoPaysSlice.reducer;

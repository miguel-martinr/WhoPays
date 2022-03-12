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

    linkItemsToPayer: (state, action: PayloadAction<string>) => {
      state.payerBeingLinkedId = action.payload;
    },
  },
});

export const { linkPayerToItem,
  addPayer,
  addItem,
  updatePayer,
  updateItem,
  linkItemsToPayer } = whoPaysSlice.actions;
export default whoPaysSlice.reducer;

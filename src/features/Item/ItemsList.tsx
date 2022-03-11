import { useAppSelector } from '../../app/hooks'
import { ItemProps } from '../../types/ItemProps';
import { GeneralList } from '../Utils/GeneralList';
import { Item } from './Item';


export const ItemsList = () => {

  const {items} = useAppSelector(({WhoPays}) => WhoPays);

  return (
    <GeneralList 
      itemOrPayers={items}
      cb={(item)=> <Item item={item as ItemProps} />}
    />
  )
}

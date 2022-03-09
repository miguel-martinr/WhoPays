import { useAppSelector } from '../../app/hooks'
import { Item } from './Item';


export const ItemsList = () => {

  const {items} = useAppSelector(({WhoPays}) => WhoPays);

  return (
    <>
      {
        items.map(item => 
          <div key={item.id}>
            <Item
              item={item}
            />
          </div>  
        )
      }
    </>
  )
}

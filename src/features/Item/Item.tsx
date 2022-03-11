import { Col, Form, Row } from 'react-bootstrap';
import { useAppDispatch } from '../../app/hooks';
import { ItemProps } from '../../types/ItemProps';
import { updateItem } from '../state/whoPaysSlice';
import { NameInput } from '../Utils/NameInput';


export interface ItemComponentProps {
  item: ItemProps,
}


export const Item = ({ item }: ItemComponentProps) => {

  const dispatch = useAppDispatch();
  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateItem({ ...item, price: parseInt(event.target.value) }));
  }
  return (

    <Row className="ms-5">
      <Col>
        <button>Link payer</button>
      </Col>
      <NameInput
        itemOrPayer={item}
        nameUpdater={updateItem}
      >
        <Col>
        <Form.Control type='number' value={item.price} onChange={onPriceChange} />
        </Col>
      </NameInput>

    </Row>
  )
}

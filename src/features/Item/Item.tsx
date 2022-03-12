import { Col, Form, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ItemProps } from '../../types/ItemProps';
import { linkPayerToItem, unlinkPayerFromItem, updateItem } from '../state/whoPaysSlice';
import { LinkButton } from '../Utils/Buttons/LinkButton';
import { NameInput } from '../Utils/NameInput';


export interface ItemComponentProps {
  item: ItemProps,
}


export const Item = ({ item }: ItemComponentProps) => {

  const { payerBeingLinkedId } = useAppSelector(({ WhoPays }) => WhoPays);
  const dispatch = useAppDispatch();
  const onPriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateItem({ ...item, price: parseFloat(event.target.value) }));
  }
  const onCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      dispatch(linkPayerToItem({ itemId: item.id, payerId: payerBeingLinkedId }));
    } else {
      dispatch(unlinkPayerFromItem({ itemId: item.id, payerId: payerBeingLinkedId }));
    }
  }
  return (

    <Row className="ms-5">
      <Col>
        {
          !payerBeingLinkedId ?
            <LinkButton text='Link payer' variant='success' /> :
            <Form.Check
              type='checkbox'
              onChange={onCheckboxChange}
              defaultChecked={item.linkedPayers.includes(payerBeingLinkedId)}
            />
        }
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

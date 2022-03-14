import { Col, Form, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector, useSmallDisplay } from '../../app/hooks';
import { ItemProps } from '../../types/ItemProps';
import { linkPayerToItem, unlinkPayerFromItem, updateItem } from '../state/whoPaysSlice';
import { LinkButton } from '../Utils/Buttons/LinkButton';
import { TrashButton } from '../Utils/Buttons/TrashButton';
import { NameInput } from '../Utils/NameInput';
import { ResponsiveRow } from '../Utils/ResponsiveRow';


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

  const isDisplaySmall = useSmallDisplay();

  const getNumOfPayersMessage = () => {
    const numOfPayers = item.linkedPayers.length;
    return numOfPayers + ' payer' + (numOfPayers > 1 ? 's' : '');
  }
  const appendix = !payerBeingLinkedId ?

    <LinkButton variant='success' text={getNumOfPayersMessage()} /> :
    <Form.Check
      type='checkbox'
      onChange={onCheckboxChange}
      defaultChecked={item.linkedPayers.includes(payerBeingLinkedId)}
    />;

  const buttons = <Col>
    <Row>
      <Col xs={3} sm={2} ><TrashButton /></Col>
      <Col xs={9} sm={10}>{appendix}</Col>
    </Row>
  </Col>;

  const left = isDisplaySmall ? '' : buttons;
  const right = left ? '' : buttons;

  return (

    <ResponsiveRow >
      {left}
      <NameInput
        itemOrPayer={item}
        nameUpdater={updateItem}
      >
        <Col>
          <Form.Control type='number' value={item.price} onChange={onPriceChange} />
        </Col>
      </NameInput>
      {right}
    </ResponsiveRow>
  )
}

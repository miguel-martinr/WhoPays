import { Button, Col, Form, Row } from 'react-bootstrap';
import { useAppDispatch, useAppSelector, useBSSize, useSmallDisplay } from '../../app/hooks';
import { ItemProps } from '../../types/ItemProps';
import { linkPayerToItem, unlinkPayerFromItem, updateItem } from '../state/whoPaysSlice';
import { LinkButton } from '../Utils/Buttons/LinkButton';
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

    <LinkButton variant='success' text={getNumOfPayersMessage()}/> :
    <Form.Check
      type='checkbox'
      onChange={onCheckboxChange}
      defaultChecked={item.linkedPayers.includes(payerBeingLinkedId)}
    />;

  const left = isDisplaySmall ? '' : <Col>{appendix}</Col>;
  const right = left ? '' : appendix;

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

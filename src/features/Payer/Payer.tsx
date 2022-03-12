import { Col, Form, Row } from 'react-bootstrap';
import { PayerProps } from '../../types/PayerProps';
import { setPayerBeingLinked, updatePayer } from '../state/whoPaysSlice';
import { NameInput } from '../Utils/NameInput';
import { LinkButton } from '../Utils/Buttons/LinkButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export interface PayerComponentProps {
  payer: PayerProps,
}


export const Payer = ({ payer }: PayerComponentProps) => {

  const { payerBeingLinkedId, items } = useAppSelector(({ WhoPays }) => WhoPays);

  const showLinkButton = !payerBeingLinkedId || payer.id === payerBeingLinkedId;
  const dispatch = useAppDispatch();
  const calculateAmmounToPay = () => {
    const ammountToPay = payer.linkedItems
      .map(id => items.find(i => i.id === id))
      .filter(i => i !== undefined)
      .map(i => i!.price / i!.linkedPayers.length)
      .reduce((acc, curr) => acc + curr, 0);
    return ammountToPay;
  };

  const linkHandler = () => {
    if (payerBeingLinkedId === '') return dispatch(setPayerBeingLinked(payer.id));
    return dispatch(setPayerBeingLinked(''));
  }


  return (
    <Row className="me-5">
      <NameInput
        itemOrPayer={payer}
        nameUpdater={updatePayer}
      >
        <Col>
          <Form.Control type='number' value={calculateAmmounToPay()} readOnly />
        </Col>
      </NameInput>
      <Col>
        <LinkButton
          hidden={!showLinkButton}
          text={payerBeingLinkedId === payer.id ? 'Ok' : 'Link items'}
          onClick={linkHandler} />
      </Col>
    </Row>
  )
}

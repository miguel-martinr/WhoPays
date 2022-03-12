import { Col, Form, Row } from 'react-bootstrap';
import { PayerProps } from '../../types/PayerProps';
import { linkItemsToPayer, updatePayer } from '../state/whoPaysSlice';
import { NameInput } from '../Utils/NameInput';
import { LinkButton } from '../Utils/Buttons/LinkButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

export interface PayerComponentProps {
  payer: PayerProps,
}


export const Payer = ({ payer }: PayerComponentProps) => {

  const { payerBeingLinkedId } = useAppSelector(({ WhoPays }) => WhoPays);

  const showLinkButton = !payerBeingLinkedId || payer.id === payerBeingLinkedId;
  const dispatch = useAppDispatch();
  const linkHandler = () => {
    if (payerBeingLinkedId === '') return dispatch(linkItemsToPayer(payer.id));
    return dispatch(linkItemsToPayer(''));
  }


  return (
    <Row className="me-5">
      <NameInput
        itemOrPayer={payer}
        nameUpdater={updatePayer}
      >
        <Col>
          <Form.Control type='number' value={payer.ammountToPay} readOnly />
        </Col>
      </NameInput>
      <Col>
        <LinkButton hidden={!showLinkButton} text={payerBeingLinkedId === payer.id ? 'Ok' : 'Link items'} onClick={linkHandler}/>
      </Col>
    </Row>
  )
}

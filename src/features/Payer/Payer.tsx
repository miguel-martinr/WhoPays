import { Col, Form, Row } from 'react-bootstrap';
import { PayerProps } from '../../types/PayerProps';
import { updatePayer } from '../state/whoPaysSlice';
import { NameInput } from '../Utils/NameInput';
import { LinkButton } from '../Utils/Buttons/LinkButton';

export interface PayerComponentProps {
  payer: PayerProps,
}


export const Payer = ({ payer }: PayerComponentProps) => {


  return (
    <Row className="me-5">
      <NameInput
        itemOrPayer={payer}
        nameUpdater={updatePayer}
      >
        <Col>
          <Form.Control type='number' value={payer.ammountToPay} readOnly/>
        </Col>
      </NameInput>
      <Col>
        <LinkButton text='Link item'/>
      </Col>
    </Row>
  )
}

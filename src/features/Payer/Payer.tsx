import { Col, Form, Image, Row } from 'react-bootstrap';
import { PayerProps } from '../../types/PayerProps';
import { updatePayer } from '../state/whoPaysSlice';
import { AdaptiveButton } from '../Utils/Buttons/AdaptiveButton';
import { NameInput } from '../Utils/NameInput';
import { BsLink } from 'react-icons/bs';

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
        <AdaptiveButton 
          
          contentWhenSM={<BsLink size={20}/>} 
          contentWhenLG='Link payer'
        />
      </Col>
    </Row>
  )
}

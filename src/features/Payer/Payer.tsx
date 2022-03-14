import { Col, Form, Row } from 'react-bootstrap';
import { PayerProps } from '../../types/PayerProps';
import { removePayer, setPayerBeingLinked, updatePayer } from '../state/whoPaysSlice';
import { NameInput } from '../Utils/NameInput';
import { LinkButton } from '../Utils/Buttons/LinkButton';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { ResponsiveRow } from '../Utils/ResponsiveRow';
import { TrashButton } from '../Utils/Buttons/TrashButton';


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

  const removeHandler = () => {
    dispatch(removePayer(payer.id))
  }

  return (

    <ResponsiveRow>
      <NameInput
        itemOrPayer={payer}
        nameUpdater={updatePayer}
      >
        <Col>
          <Form.Control type='number' value={calculateAmmounToPay()} readOnly />
        </Col>
      </NameInput>
      <Col>
        <Row>
          <Col xs={9} sm={10}>
            <LinkButton
              hidden={!showLinkButton}
              text={payerBeingLinkedId === payer.id ? 'Ok' : 'Link'}
              onClick={linkHandler} />
          </Col>
          <Col xs={3} sm={2} className='ps-0 pe-4'>
            <TrashButton onClick={removeHandler}/>
          </Col>
        </Row>
      </Col>


    </ResponsiveRow>

  )
}



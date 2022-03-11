import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import { useAppDispatch } from './app/hooks';
import { ItemsList } from './features/Item/ItemsList';
import { PayersList } from './features/Payer/PayersList';
import { addItem, addPayer } from './features/state/whoPaysSlice';
import { AddButton } from './features/Utils';



function App() {

  const dispatch = useAppDispatch();

  const defaultPayerProps = { name: '', ammountToPay: 0, linkedItems: [], id: 'EMPTY_PAYER' };
  const defaultItemProps = { name: '', price: 0, linkedPayers: [], id: 'EMPTY_ITEM' };


  const addPayerHandler = () => {
    dispatch(addPayer(defaultPayerProps));
  }

  const addItemHandler = () => {
    dispatch(addItem(defaultItemProps));
  }


  return (
    <div className="App">
      <Container className="mt-2">
        <Row>
          <Col className='text-center'><h1>Who Pays</h1></Col>
        </Row>

        {/* Titles */}
        <Row>
          <Col sm-4 className='text-center'><h2>Payers</h2></Col>
          <Col sm-4></Col>
          <Col sm-4 className='text-center'><h2>Items</h2></Col>
        </Row>

        {/* Buttons */}
        <Row>
          {/* Payers */}
          <Col className='text-center'>
            <AddButton
              onClick={addPayerHandler}
            />
          </Col>

          <Col sm-4></Col>
          {/* Items */}
          <Col className='text-center'>
            <AddButton
              onClick={addItemHandler}
            />
          </Col>
        </Row>

        {/* Lists names */}
        <Row className='mt-4'>
          {/* Payers */}
          <Col>
            <Row>
              <Col sm-4 className="text-center">Name</Col>
              <Col sm-4 className="text-center" >Pays</Col>
              <Col sm-4></Col>
            </Row>
          </Col>

          {/* Items */}
          <Col>
            <Row>
              <Col sm-4></Col>
              <Col sm-4 className="text-center">Name</Col>
              <Col sm-4 className="text-center" >Price</Col>
            </Row>

          </Col>
        </Row>

        {/* Lists */}
        <Row>
          {/* Payers */}
          <Col className="text-center">
            <PayersList />
          </Col>

          {/* Items */}
          <Col className="text-center">
            <ItemsList />
          </Col>
        </Row>
      </Container>
    </div >
  );
}

export default App;

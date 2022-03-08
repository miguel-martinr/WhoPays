import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './App.css';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { Item } from './features/Item/Item';
import { Payer } from './features/Payer/Payer';
import { addItem, addPayer, updateNewItem, updateNewPayer } from './features/state/whoPaysSlice';
import { AddButton } from './features/Utils';
import { ItemProps } from './types/ItemProps';
import { PayerProps } from './types/PayerProps';

function App() {

  const dispatch = useAppDispatch();
  const { payers, newPayer, newItem, items } = useAppSelector(({ WhoPays }) => WhoPays);

  const defaultPayerProps = { name: '', ammountToPay: 0, linkedItems: [] };
  const defaultItemProps = { name: '', price: 0, linkedPayers: [] };
  
  const buttonTextOptions = ['Add +', 'Ok'];
  const [selectedButtonTexts, setSelectedButtonTexts] = useState({
    addPayer: 0,
    addItem: 0,
  });

  const [editablePayerVisible, setEditablePayerVisible] = useState<boolean>(false);
  const [editableItemVisible, setEditableItemVisible] = useState<boolean>(false);

  const addPayerHandler = () => {
    const selectedButtonText = selectedButtonTexts.addPayer;
    if (selectedButtonText === 0) {
      setSelectedButtonTexts({ ...selectedButtonTexts, addPayer: 1 });
      setEditablePayerVisible(true);

    } else {
      // Add new payer to store
      dispatch(addPayer(newPayer));
      dispatch(updateNewPayer(defaultPayerProps));
      setSelectedButtonTexts({ ...selectedButtonTexts, addPayer: 0 });
      setEditablePayerVisible(false);
    }
  }

  const addItemHandler = () => {
    const selectedButtonText = selectedButtonTexts.addItem;
    if (selectedButtonText === 0) {
      setSelectedButtonTexts({ ...selectedButtonTexts, addItem: 1 });
      setEditableItemVisible(true);

    } else {

      // Add new item to store
      dispatch(addItem(newItem));
      dispatch(updateNewItem(defaultItemProps));
      setSelectedButtonTexts({ ...selectedButtonTexts, addItem: 0 });
      setEditableItemVisible(false);
    }
  }

  return (
    <div className="App">
      <Container>
        <Row>
          <Col className='text-center'><h1>Who Pays</h1></Col>
        </Row>

        <Row>
          <Col className='text-center'><h2>Payers</h2></Col>
          <Col className='text-center'><h2>Items</h2></Col>
        </Row>

        <Row>
          <Col className='text-center'>
            <AddButton
              onClick={addPayerHandler}
              text={buttonTextOptions[selectedButtonTexts.addPayer]}
            />
          </Col>

          <Col className='text-center'>
            <AddButton
              onClick={addItemHandler}
              text={buttonTextOptions[selectedButtonTexts.addItem]}
            />
          </Col>
        </Row>

        <Row className='mt-4'>
          <Col>
            <Row>
              <Col className="text-center">Name</Col>
              <Col>Pays</Col>
            </Row>
          </Col>

          <Col>
            <Row>
              <Col className="text-center">Name</Col>
              <Col>Price</Col>
            </Row>

          </Col>
        </Row>

        {/* Lists */}
        <Row>

          <Col className="text-center">
            <div>
              {
                payers.map(payer =>
                  <div>
                    <Payer
                      key={payer.name}
                      payer={payer}
                      readOnlyPays
                      readOnlyName
                    />
                  </div>
                )
              }
              {
                editablePayerVisible &&
                <Payer
                  payer={newPayer}
                  onChange={(newValues: PayerProps) => dispatch(updateNewPayer(newValues))}
                  readOnlyName={false}
                />

              }
            </div>
          </Col>

          <Col className="text-center">
            <div>
              {
                items.map(item =>
                  <div>
                    <Item
                      key={item.name}
                      item={item}
                      readOnly
                    />
                  </div>
                )
              }
              {
                editableItemVisible &&
                <Item
                  item={newItem}
                  onChange={(newValues: ItemProps) => dispatch(updateNewItem(newValues))}
                  readOnly={false}
                />
              }
            </div>
          </Col>
        </Row>
      </Container>





    </div >
  );
}

export default App;

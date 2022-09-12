import React, { useEffect, useState } from 'react';
import './index.css';
import Container from 'react-bootstrap/Container';
import { styled } from '@mui/material/styles';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from '@mui/material/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

import { BsFillTrashFill, BsCheck } from "react-icons/bs";

const BootstrapButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: '#0063cc',
  borderColor: '#0063cc',
  fontFamily: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(','),
  '&:hover': {
    backgroundColor: '#0069d9',
    borderColor: '#0062cc',
    boxShadow: 'none',
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: '#0062cc',
    borderColor: '#005cbf',
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
  },
});

function Home() {
  const [dataSever, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [index, setIndex] = useState();

  useEffect(() => {
    async function getUser() {
      try {
        fetch("https://fake-saver.herokuapp.com/items")
          .then(response => response.json())
          .then(result => setData(result))
          .catch(error => console.log('error', error))
          .finally(setLoading(false))
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
  }, [])


  const handleRemove = async (index) => {
    const newItems = dataSever.filter((item, i) => i !== index)
    setData([...newItems])
  }

  const handleClose = () => setShow(false);

  const handleShow = (index) => {
    setShow(true)
    setIndex(index)
  }
  const handleDelete = (index) => {
    handleClose()
    handleRemove(index)
  }

  // const data = [
  //   {
  //     "title": "Alimentação",
  //     "color": "#172643",
  //     "textColor": "#fff",
  //     "iconColor": "#E7FD7F",
  //     "defaultValue": "Díario",
  //     "valor": 45.5,
  //     "total": 63700,
  //   },
  //   {
  //     "title": "Cultura",
  //     "color": "#1D335B",
  //     "textColor": "#fff",
  //     "iconColor": "#E7FD7F",
  //     "defaultValue": "Mensal",
  //     "valor": 100,
  //     "total": 3500,
  //   },
  //   {
  //     "title": "Flexivel",
  //     "color": "#005D80",
  //     "textColor": "#fff",
  //     "iconColor": "#E7FD7F",
  //     "defaultValue": "Quinzenal",
  //     "valor": 100,
  //     "total": 4200,
  //   },
  //   {
  //     "title": "Home Office",
  //     "color": "#00979B",
  //     "textColor": "#fff",
  //     "iconColor": "#E7FD7F",
  //     "defaultValue": "Mensal",
  //     "valor": 1200,
  //     "total": 42000,
  //   },
  //   {
  //     "title": "Mobilidade",
  //     "color": "#59D091",
  //     "textColor": "#000",
  //     "iconColor": "#172643",
  //     "defaultValue": "Mensal",
  //     "valor": 12,
  //     "total": 8400,
  //   },
  //   {
  //     "title": "Saúde",
  //     "color": "#E7FD7F",
  //     "textColor": "#000",
  //     "iconColor": "#172643",
  //     "defaultValue": "Mensal",
  //     "valor": 420,
  //     "total": 41160,
  //   }
  // ]

  return (
    <div className="App" >
      {showAlert ?
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible style={{ margin: 10 }}>
          <Alert.Heading>Erro ao excluir item!</Alert.Heading>
          <p>
            O item selecionado não pode ser excluido
          </p>
        </Alert>
        : null}

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remover</Modal.Title>
        </Modal.Header>
        <Modal.Body>Deseja realmente remover o item?!</Modal.Body>
        <Modal.Footer>
          <Button
            style={{
              backgroundColor: '#1565C0',
              color: 'white',
              marginRight: 20
            }} onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={() => handleDelete(index)} variant="primary" >
            Remover
          </Button>
        </Modal.Footer>
      </Modal>

      <Container fluid>
        <Row style={{ margin: 20, }}>
          <Col xs={7} md={7}>
            <Card style={{
              overflow: 'hidden',
              borderRadius: 15,
              borderWidth: 1,
              borderStyle: 'solid',
              borderColor: '#FCFCFD',
              backgroundColor: '#FCFCFD'
            }}>
              <Row xs={5} md={7} style={{ alignItems: 'center' }}>
                <Col xs={5} md={6}>
                  <p
                    className="ms-2 me-auto"
                    style={{
                      paddingLeft: 10,
                      paddingTop: 10,
                      fontSize: 20,
                      fontWeight: 'bold'
                    }}
                  >Categorias</p>
                </Col>
                <Col
                  xs={5} md={6}
                  style={{ justifyContent: 'flex-end', }}
                  className="d-flex align-items-left"
                >
                  <Dropdown variant="bg-white" style={{ right: 20, width: 300 }}>
                    <Dropdown.Toggle
                      style={{
                        backgroundColor: '#ddd',
                        width: 300,
                        textAlign: 'left'
                      }}
                      className="ms-2 me-auto" variant="light"
                    >
                      Selecione um grupo
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">Díario</Dropdown.Item>
                      <Dropdown.Item href="#/action-2">Mensal</Dropdown.Item>
                      <Dropdown.Item href="#/action-3">Quinzenal</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </Col>
              </Row>
              <Card.Body>

                <Table hover responsive="sm" borderless>
                  <thead style={{
                    backgroundColor: '#EAECF0', textAlign: 'center'
                  }}>
                    <tr>
                      <th className='thStyleLeft'>Categoria</th>
                      <th>Frequência</th>
                      <th>Valor</th>
                      <th className='thStyleRight'>Valor total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading ?
                      <>
                        {dataSever.map((item, index) => (
                          <tr key={index}>
                            <td>{item.title}</td>
                            <td>{item.defaultValue}</td>
                            <td>{item.valor ? item?.valor?.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : null}</td>
                            <td>{item.total ? item?.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' }) : null}</td>
                          </tr>
                        ))}
                      </>
                      : <a>Carregando...</a>}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={5} md={5}>
            <Card className='cardStyleCol'>
              <Card.Body >
                <h3 className='h3Style'>Resumo</h3>
                <h6 className='h6Style'>Gestores de área</h6>

                <ListGroup as="ol" >
                  {!loading ?
                    <>
                      {dataSever.map((item, index) => (
                        <ListGroup.Item
                          key={index}
                          as="li"
                          className="d-flex justify-content-between align-items-center"
                          style={{ backgroundColor: item.color, borderColor: 'white' }}
                        >
                          <div
                            style={{
                              textAlign: 'left',
                              color: item.textColor,
                              width: '20%'
                            }}
                            className="ms-2 me-auto"
                          >
                            {item.title}
                          </div>
                          <Dropdown variant="bg-white" className="ms-2 me-auto" >
                            <Dropdown.Toggle style={{ width: 120 }} variant="light" id="dropdown-basic">
                              {item.defaultValue}
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                              <Dropdown.Item href="#/action-1">Díario</Dropdown.Item>
                              <Dropdown.Item href="#/action-2">Mensal</Dropdown.Item>
                              <Dropdown.Item href="#/action-3">Quinzenal</Dropdown.Item>
                            </Dropdown.Menu>
                          </Dropdown>

                          <Button
                            onClick={() =>
                              item.defaultValue === 'Mensal' ? setShowAlert(true) : handleShow(index)}
                            variant="link">
                            <BsFillTrashFill size="24" color={item.iconColor} />
                          </Button>
                        </ListGroup.Item>

                      ))}
                    </>
                    : <a>Carregando...</a>}
                </ListGroup>

                <Row xs={12} md={8} style={{ marginTop: 10 }}>
                  <Col xs={4} md={6}>
                    <BootstrapButton
                      style={{
                        width: '100%',
                        backgroundColor: '#172643',
                        padding: 10
                      }}
                      variant="contained"
                      disableRipple
                      startIcon={<BsCheck />}
                    >
                      Ativar categoria
                    </BootstrapButton>
                  </Col>
                  <Col xs={4} md={6}>
                    <BootstrapButton
                      style={{
                        width: '100%',
                        backgroundColor: '#98A2B3',
                        padding: 10,
                        borderColor: '#98A2B3',
                        color: '#ddd'
                      }}
                      disabled
                      variant="contained"
                    >
                      Salvar alterações
                    </BootstrapButton>
                  </Col>
                </Row>

              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;

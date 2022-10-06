import React from "react";
import axios from "axios";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

class Clientes extends React.Component {

  constructor(props) {
    super(props);
    this.state = { contacts: [] };
    this.headers = [
      { key: 'id', label: 'Id' },
      { key: 'name', label: 'Nome' },
      { key: 'email', label: 'Email' },
      { key: 'cpf', label: 'CPF' },
      { key: 'cidade', label: 'Cidade' },
      { key: 'data_nascimento', label: 'Data' }
    ];
    this.deleteContact = this.deleteContact.bind(this);
  }
  componentDidMount() {
    const url = 'https://react.mkwebdesigner.com/public_html/api/cliente'
    axios.get(url).then(response => response.data)
      .then((data) => {
        this.setState({ contacts: data })
        console.log(this.state.contacts)
      })
  }

  deleteContact(id, event) { //alert(id)
    event.preventDefault();
    if (window.confirm("Deseja apagar o registrod ?")) {
      axios({
        method: 'POST',
        url: 'https://react.mkwebdesigner.com/public_html/api/cliente/?id=' + id,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then(function (response) {
          //handle success
          console.log(response)
          if (response.status === 200) {
            alert("Cliente deletado com sucesso !");
            window.location.reload();
          }
        })
        .catch(function (response) {
          //handle error
          console.log(response)
        });
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Lista de clientes</Card.Title>
                <p><Link to="./create_client" className="btn btn-primary btn-xs">Adicionar cliente</Link> </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      {
                        this.headers.map(function (h) {
                          return (
                            <th key={h.key}>{h.label}</th>
                          )
                        })
                      }
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      this.state.contacts.map(function (item, key) {
                        return (
                          <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>{item.cpf}</td>
                            <td>{item.cidade}</td>
                            <td>{item.data_nascimento}</td>
                            <td>
                              <Link to={`./update_client/${item.id}`} className="btn btn-primary btn-xs">Editar</Link>

                              <Link to="#" onClick={this.deleteContact.bind(this, item.id)} className="btn btn-danger btn-xs">Deletar</Link>
                            </td>
                          </tr>)
                      }.bind(this))
                    }
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    )
  }

}

export default Clientes;

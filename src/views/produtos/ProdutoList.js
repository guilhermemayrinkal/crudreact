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

class Produtos extends React.Component {

  constructor(props) {
    super(props);
    this.state = { produtos: [] };
    this.headers = [
      { key: 'id', label: 'Id' },
      { key: 'nome', label: 'Nome' },
      { key: 'Valor', label: 'Valor' },
    ];
    this.deleteProduto = this.deleteProduto.bind(this);
  }
  componentDidMount() {
    const url = 'https://react.mkwebdesigner.com/public_html/api/produto'
    axios.get(url).then(response => response.data)
      .then((data) => {
        this.setState({ produtos: data })
        console.log(this.state.produtos)
      })
  }

  deleteProduto(id, event) { //alert(id)
    event.preventDefault();
    if (window.confirm("Deseja apagar o registrod ?")) {
      axios({
        method: 'POST',
        url: 'https://react.mkwebdesigner.com/public_html/api/produto/?id=' + id,
        config: { headers: { 'Content-Type': 'multipart/form-data' } },
      })
        .then(function (response) {
          //handle success
          console.log(response)
          if (response.status === 200) {
            alert("Produto deletado com sucesso");
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
                <Card.Title as="h4">Lista de produtos</Card.Title>
                <p><Link to="./create_product" className="btn btn-primary btn-xs">Adicionar produto</Link> </p>
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
                      this.state.produtos.map(function (item, key) {
                        return (
                          <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.valor_unit}</td>
                            <td>
                              <Link to={`./update_product/${item.id}`} className="btn btn-primary btn-xs">Editar</Link>

                              <Link to="#" onClick={this.deleteProduto.bind(this, item.id)} className="btn btn-danger btn-xs">Deletar</Link>
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

export default Produtos;

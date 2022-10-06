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

class Vendas extends React.Component {

  constructor(props) {
    super(props);
    this.state = { vendas: [] };
    this.headers = [
      { key: 'id', label: 'Id' },
      { key: 'cliente', label: 'Cliente' },
      { key: 'produtos', label: 'Produtos' },
      { key: 'total', label: 'Total' },
      { key: 'data', label: 'Data' },
    ];
    this.deleteVenda = this.deleteVenda.bind(this);
  }
  
  componentDidMount() {
    const url = 'https://react.mkwebdesigner.com/public_html/api/venda'
    axios.get(url).then(response => response.data)
      .then((data) => {
        this.setState({ vendas: data })
        console.log(this.state.vendas)
      })
  }

  deleteVenda(id, event) { //alert(id)
    event.preventDefault();
    if (window.confirm("Deseja deletar o registro ?")) {
      axios({
        method: 'post',
        url: 'https://react.mkwebdesigner.com/public_html/api/venda/?id=' + id
      })
        .then(function (response) {
          //handle success
          console.log(response)
          if (response.status === 200) {
            alert("Venda deletada com sucesso");
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
                <Card.Title as="h4">Lista de vendas</Card.Title>
                <p><Link to="./create_venda" className="btn btn-primary btn-xs">Adicionar venda</Link> </p>
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
                      this.state.vendas.map(function (item, key) {
                        return (
                          <tr key={key}>
                            <td>{item.id}</td>
                            <td>{item.cliente}</td>
                            <td>{item.produto}</td>
                            <td>{item.total}</td>
                            <td>{item.data}</td>
                            <td>
                              <Link to={`./update_venda/${item.id}`} className="btn btn-primary btn-xs">Editar</Link>

                              <Link to="#" onClick={this.deleteVenda.bind(this, item.id)} className="btn btn-danger btn-xs">Deletar</Link>
                            </td>
                          </tr>
                        )
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

export default Vendas;

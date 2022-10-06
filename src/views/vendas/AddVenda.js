//src/create.js
import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
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

class AddVenda extends React.Component {
    constructor(props) {
        super(props);
        this.state = { total: '', produtos: [], clientes: [], cliente: '', produto: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const url = 'https://react.mkwebdesigner.com/public_html/api/produto'
        axios.get(url).then(response => response.data)
            .then((data) => {
                this.setState({ produtos: data })
                console.log(this.state.produtos)
            })

        const url2 = 'https://react.mkwebdesigner.com/public_html/api/cliente'
        axios.get(url2).then(response => response.data)
            .then((data) => {
                this.setState({ clientes: data })
                console.log(this.state.clientes)
            })
    }
    handleChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value
        this.setState(state);
    }
    handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('cliente', this.state.cliente)
        formData.append('produto', this.state.produto)
        formData.append('total', this.state.total)

        axios({
            method: 'post',
            url: 'https://react.mkwebdesigner.com/public_html/api/venda',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                console.log(response)
                alert('Nova venda adicionada com sucesso.');
            })
            .catch(function (response) {
                //handle error
                console.log(response)
            });

    }
    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md="12">
                        <Card className="strpied-tabled-with-hover">
                            <Card.Header>
                                <Card.Title as="h4">Cadastrar nova venda</Card.Title>

                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <div className="container">
                                    <div className="col-md-12">
                                        <div className="panel panel-primary">
                                            <div className="panel-body">
                                                <form onSubmit={this.handleSubmit}>
                                                    <label>Total</label>
                                                    <input type="text" name="total" className="form-control" value={this.state.total} onChange={this.handleChange} />

                                                    <label>Cliente</label>
                                                    <select name="cliente" value={this.state.cliente} className="form-control" onChange={this.handleChange} >
                                                        <option value="">Selecione um cliente</option>
                                                        {
                                                            this.state.clientes.map(function (item, key) {
                                                                return (
                                                                    <option key={key} value={item.name}>
                                                                        {item.name}
                                                                    </option>
                                                                )
                                                            }.bind(this))
                                                        }
                                                    </select>
                                                    <br />
                                                    <br />
                                                    <select name="produto" className="form-control" onChange={this.handleChange}>
                                                        <option value="">Selecione um produto</option>
                                                        {
                                                            this.state.produtos.map(function (item, key) {
                                                                return (
                                                                    <option key={key} value={item.nome}>
                                                                        {item.nome}
                                                                    </option>
                                                                )
                                                            }.bind(this))
                                                        }
                                                    </select>



                                                    <br />
                                                    <input type="submit" className="btn btn-primary btn-block" value="Salvar" />
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container >
        );
    }
}

export default AddVenda;
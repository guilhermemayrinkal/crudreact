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

class AddProduto extends React.Component {
    constructor(props) {
        super(props);
        this.state = { nome: '', valor_unit: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value
        this.setState(state);
    }
    handleSubmit(event) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('nome', this.state.nome)
        formData.append('valor_unit', this.state.valor_unit)

        axios({
            method: 'post',
            url: 'https://react.mkwebdesigner.com/public_html/api/produto/',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                console.log(response)
                alert('Novo produto adicionado com sucesso.');
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
                                <Card.Title as="h4">Cadastrar novo produto</Card.Title>
                                
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <div className="container">
                                    <div className="col-md-12">
                                        <div className="panel panel-primary">
                                            <div className="panel-body">
                                                <form onSubmit={this.handleSubmit}>
                                                    <label>Nome</label>
                                                    <input type="text" name="nome" className="form-control" value={this.state.nome} onChange={this.handleChange} />

                                                    <label>Valor unitário</label>
                                                    <input type="text" name="valor_unit" className="form-control" value={this.state.valor_unit} onChange={this.handleChange} />

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

export default AddProduto;
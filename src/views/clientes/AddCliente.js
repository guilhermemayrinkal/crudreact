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

class AddCliente extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', cpf: '', cep: '', logradouro: '', numero: '',  bairro: '',  complemento: '',  cidade: '', email: '', data_nascimento: '' };
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
        formData.append('name', this.state.name)
        formData.append('cpf', this.state.cpf)
        formData.append('cep', this.state.cep)
        formData.append('logradouro', this.state.logradouro)
        formData.append('numero', this.state.numero)
        formData.append('bairro', this.state.bairro)
        formData.append('complemento', this.state.complemento)
        formData.append('cidade', this.state.cidade)
        formData.append('email', this.state.email)
        formData.append('data_nascimento', this.state.data_nascimento)

        axios({
            method: 'post',
            url: 'https://react.mkwebdesigner.com/public_html/api/cliente/',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                console.log(response)
                alert('Novo cliente adicionado com sucesso.');
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
                                <Card.Title as="h4">Cadastrar novo cliente</Card.Title>
                                
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <div className="container">
                                    <div className="col-md-12">
                                        <div className="panel panel-primary">
                                            <div className="panel-body">
                                                <form onSubmit={this.handleSubmit}>
                                                    <label>Name</label>
                                                    <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleChange} />

                                                    <label>CPF</label>
                                                    <input type="text" name="cpf" className="form-control" value={this.state.cpf} onChange={this.handleChange} />

                                                    <label>CEP</label>
                                                    <input type="text" name="cep" className="form-control" value={this.state.cep} onChange={this.handleChange} />

                                                    <label>Logradouro</label>
                                                    <input type="text" name="logradouro" className="form-control" value={this.state.logradouro} onChange={this.handleChange} />

                                                    <label>Número</label>
                                                    <input type="text" name="numero" className="form-control" value={this.state.numero} onChange={this.handleChange} />

                                                    <label>Bairro</label>
                                                    <input type="text" name="bairro" className="form-control" value={this.state.bairro} onChange={this.handleChange} />

                                                    <label>Complemento</label>
                                                    <input type="text" name="complemento" className="form-control" value={this.state.complemento} onChange={this.handleChange} />

                                                    <label>Cidade</label>
                                                    <input type="text" name="cidade" className="form-control" value={this.state.cidade} onChange={this.handleChange} />

                                                    <label>Email</label>
                                                    <input type="email" name="email" className="form-control" value={this.state.email} onChange={this.handleChange} />

                                                    <label>Data de Nascimento</label>
                                                    <input type="date" name="data_nascimento" className="form-control" value={this.state.data_nascimento} onChange={this.handleChange} />
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

export default AddCliente;
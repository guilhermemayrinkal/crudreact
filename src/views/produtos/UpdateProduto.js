//src/create.js
import React from 'react';
import { Link, useParams } from 'react-router-dom';
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

function withParams(Component) {
    return props => <Component {...props} params={useParams()} />;
}

class UpdateProduto extends React.Component {
    
    constructor(props) {
        
        super(props);
        this.state = { nome: '', valor_unit: '' };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        
    }

    componentDidMount() {
        let { id } = this.props.params;
        axios.get('https://react.mkwebdesigner.com/public_html/api/produto/' + id)
            .then(response => response.data)
            .then((data) => {
                // handle success
                console.log(data);
                this.setState({
                    id: data.id, nome: data.nome, valor_unit: data.valor_unit
                })
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
            .then(function () {
                // always executed
            });

    }

    handleChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value
        this.setState(state);
    }

    handleSubmit(event) {
        let { id } = this.props.params;
        event.preventDefault();

        let formData = new FormData();
        formData.append('id_produto', this.state.id)
        formData.append('nome', this.state.nome)
        formData.append('valor_unit', this.state.valor_unit)
        formData.append('method', 'update')

        axios({
            method: 'post',
            url: 'https://react.mkwebdesigner.com/public_html/api/produto/',
            data: formData,
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        })
            .then(function (response) {
                //handle success
                console.log(response)
                if (response.status === 200) {
                    alert("Produto atualizado com sucesso.");
                    window.location.href = "../produtos"
                }
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
                                <Card.Title as="h4">Editar cliente - {this.state.nome}</Card.Title>
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
                                                    <input type="hidden" name="id_produto" value={this.state.id} className="btn btn-primary btn-block"/>
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
export default withParams(UpdateProduto);
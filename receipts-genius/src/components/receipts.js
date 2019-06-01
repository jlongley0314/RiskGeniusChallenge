import React from 'react'
import {faFilePdf, faPlus, faTrash, faReceipt, faCalendar} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileImage} from "@fortawesome/free-regular-svg-icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {AddReceiptForm} from './addReceiptsForm';
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";

export class Receipts extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            receipts: [],
            modalShow: false,
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            validated: false
        };
    }

    componentDidMount() {
        fetch('/api/receipts')
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(receipts => {
                console.log(receipts);
                this.setState({ receipts })
            });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validated: true });
    }

    render() {

        const {validated} = this.state;

        function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
            try {
                decimalCount = Math.abs(decimalCount);
                decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

                const negativeSign = amount < 0 ? "-" : "";

                let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
                let j = (i.length > 3) ? i.length % 3 : 0;

                return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
            } catch (e) {
                console.log(e)
            }
        };

        function showTrashCan(show, id) {
            if (show) {
                var containerChildren = document.getElementById(id).children;
                var trash = containerChildren[0];
                trash.classList.add("show");
            } else {
                var containerChildren = document.getElementById(id).children;
                var trash = containerChildren[0];
                trash.classList.remove("show");
            }
        };

        return (

            <div class="App-body">
                <div class="sub-header">
                    <button type="button" class="add-receipt-btn btn btn-light" onClick={this.handleShow}>
                        <FontAwesomeIcon icon={faPlus}/> Add Receipt
                    </button>
                    <div class="total-container">
                        <h5 class="total-text">
                            Report
                            Total: <strong>${formatMoney(this.state.receipts.reduce((prev, next) => prev + next.total, 0).toFixed(2))}</strong>
                        </h5>
                    </div>
                </div>
                <div class="receipts-container">
                    {this.state.receipts.map((receipt) => (
                        <div id={receipt.id} class="single-receipt-container"
                             onMouseEnter={() => showTrashCan(true, receipt.id)}
                             onMouseLeave={() => showTrashCan(false, receipt.id)}>
                            <div class="receipt-container-trash">
                                <FontAwesomeIcon icon={faTrash}/>
                            </div>
                            <div class="receipt-img-container">
                                {(() => {
                                    if (receipt.file.type == "application/pdf") {
                                        return (
                                            <FontAwesomeIcon class="receipt-img" icon={faFilePdf}/>
                                        )
                                    } else {
                                        return (
                                            <FontAwesomeIcon class="receipt-img" icon={faFileImage}/>
                                        )
                                    }
                                })()}
                            </div>
                            <div class="receipt-body">
                                <p class="receipt-name">{receipt.name}</p>
                                <p className="receipt-date">{receipt.date}</p>
                                <p className="receipt-amount">${formatMoney(receipt.total)}</p>
                                {(() => {
                                    if (receipt.category != "") {
                                        return (
                                            <div class="category-container">
                                                <p className="receipt-category">{receipt.category}</p>
                                            </div>
                                        )
                                    }
                                })()}
                                <p className="receipt-description">{receipt.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Receipt</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form
                            noValidate
                            validated={validated}
                            onSubmit={e => this.handleSubmit(e)}
                        >
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label>Receipt File*</Form.Label>
                                    <Form.Control type="file" class="form-control-file" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a receipt image.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="8" controlId="validationCustom01">
                                    <Form.Label>Vendor/Retailer*</Form.Label>
                                    <Form.Control type="text" placeholder="Vendor" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a vendor / retailor.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label>Transaction Date*</Form.Label>
                                    <Form.Control type="date" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a transaction date.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Label>Category</Form.Label>
                            <Form.Row>
                                <Form.Group as={Col} xs="4" controlId="validationCustom01">
                                    <button type="button" class="subscription-btn btn btn-light"> Supplies </button>
                                </Form.Group>
                                <Form.Group as={Col} xs="4" controlId="validationCustom01">
                                    <button type="button" class="subscription-btn btn btn-light"> Subscriptions </button>
                                </Form.Group>
                                <Form.Group as={Col} xs="4" controlId="validationCustom01">
                                    <button type="button" class="subscription-btn btn btn-light"> Personal </button>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows="3"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Label>* Indicates a required field</Form.Label>
                            <Form.Row>
                                <Col xs="6" >
                                </Col>
                                <Col xs="6" >
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="primary">
                                        Add Receipt
                                    </Button>
                                </Col>
                            </Form.Row>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        )
    }
};

export default Receipts
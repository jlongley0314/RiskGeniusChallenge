import React from 'react'
import {faFilePdf, faPlus, faTrash, faReceipt} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileImage, faCalendar} from "@fortawesome/free-regular-svg-icons";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from "react-bootstrap/Col";

export class Receipts extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAmountInputChange = this.onAmountInputChange.bind(this);
        this.handleFiles = this.handleFiles.bind(this);

        this.state = {
            receipts: [],
            modalShow: false,
            name: "",
            date: "",
            total: "",
            category: "",
            description: "",
            fileName: "",
            fileType: "",
            fileSize: "",
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

    handleFiles(event) {
        const file = event.currentTarget.files[0];
        this.setState({fileName: file.name});
        this.setState({fileType: file.type});
        this.setState({fileSize: file.size});
    }

    onAmountInputChange(e){
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value))  {
            e.target.value = e.target.value;
        } else {
            e.target.value = '';
        }
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

        function selectCategory(id) {
            var selected = document.getElementById(id);
            var addSelected = selected.classList.contains("selected")
            var categories = document.getElementsByClassName("category-btn");
            for (var i = 0; i < categories.length; i++) {
                var category = categories[i];
                if (category.classList.contains("selected")) {
                    category.classList.remove("selected");
                }
            }

            // Removes selected if the list already contains it
            if (!addSelected) {
                selected.classList.add("selected");
            }

        }

        function amountSetMoney() {
            var amtInput = document.getElementById("amountInput");
            var amt = '$'+formatMoney(amtInput.value);
            amtInput.value = amt;
        }

        function setMaxDate(id) {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10){
                dd='0'+dd
            }
            if(mm<10){
                mm='0'+mm
            }

            today = yyyy+'-'+mm+'-'+dd;
            document.getElementById(id).setAttribute("max", today);
        }

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
                                <Form.Group as={Col} md="12" id="fileInput" controlId="validationCustom01">
                                    <Form.Label>Receipt File*</Form.Label>
                                    <Form.Control type="file" class="form-control-file" onChange={e => this.handleFiles(e)} required/>
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
                                    <div className="calendar-form-container">
                                        <Form.Control name="calendar" id="datePicker" type="date" onClick={() => setMaxDate("datePicker")} required/>
                                        <FontAwesomeIcon class="calendar-icon" icon={faCalendar}/>
                                    </div>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a transaction date.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="6" controlId="validationCustom01">
                                    <Form.Label>Receipt Total ($USD)*</Form.Label>
                                    <Form.Control type="text" id="amountInput" onChange={this.onAmountInputChange} onBlur={() => amountSetMoney()} placeholder="Receipt Total" required/>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a total.
                                    </Form.Control.Feedback>
                                </Form.Group>
                            </Form.Row>
                            <Form.Label>Category</Form.Label>
                            <Form.Row>
                                <Col xs="4" >
                                    <button type="button" id="supplies" onClick={() => selectCategory("supplies")} class="subscription-btn btn btn-light category-btn"> Supplies </button>
                                </Col>
                                <Col xs="4" >
                                    <button type="button" id="subscriptions" onClick={() => selectCategory("subscriptions")} class="subscription-btn btn btn-light category-btn"> Subscriptions </button>
                                </Col>
                                <Col xs="4" >
                                    <button type="button" id="personal" onClick={() => selectCategory("personal")} class="subscription-btn btn btn-light category-btn"> Personal </button>
                                </Col>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} md="12">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows="3"/>
                                </Form.Group>
                            </Form.Row>
                            <Form.Label>* Indicates a required field</Form.Label>
                            <Form.Row>
                                <Col md="6" xs="4" >
                                </Col>
                                <Col md="6" xs="8">
                                    <div class="button-container">
                                        <button class="btn btn-secondary cancel-btn">
                                            Cancel
                                        </button>
                                        <button className="btn btn-primary submit-btn">
                                            Add Receipt
                                        </button>
                                    </div>
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
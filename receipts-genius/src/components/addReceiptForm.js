import React from 'react';
import {amountSetMoney, setMaxDate} from "../scripts/utilityFunctions";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendar} from "@fortawesome/free-regular-svg-icons";

class AddReceiptForm extends React.Component {

    constructor(props) {
        super(props);

        this.handleClose = this.handleClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onAmountInputChange = this.onAmountInputChange.bind(this);
        this.handleFiles = this.handleFiles.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCategorySelect = this.handleCategorySelect.bind(this);

        this.state = {
            name: "",
            date: "",
            total: "",
            category: "",
            description: "",
            fileName: "",
            fileType: "",
            fileSize: "",
            formNameClasses: "form-control",
            formFileClasses: "form-control-file",
            formAmountClasses: "form-control",
            formDateClasses: "form-control"
        };
    }

    handleClose() {
        this.props.closeModal();
    }

    handleSubmit(event) {

        var valid = true;
        var fileInput = this.refs.fileInput;
        var vendorRetailer = this.refs.vendorRetailer;
        var datePicker = this.refs.datePicker;
        var amountInput = this.refs.amountInput;

        if (!fileInput.checkValidity()) {
            fileInput.classList.add("invalidFile");
            valid = false;
        } else {
            fileInput.classList.remove("invalidFile");
            valid = true;
        }

        if (!vendorRetailer.checkValidity()) {
            vendorRetailer.classList.add("invalid");
            valid = false;
        } else {
            vendorRetailer.classList.remove("invalid");
            valid = true;
        }

        if (!datePicker.checkValidity()) {
            datePicker.classList.add("invalid");
            valid = false;
        } else {
            datePicker.classList.remove("invalid");
            valid = true;
        }

        if (!amountInput.checkValidity()) {
            amountInput.classList.add("invalid");
            valid = false;
        } else {
            amountInput.classList.remove("invalid");
            valid = true;
        }

        if (valid) {
            var total = Number(this.state.total.replace(/\$|,/g, ''));

            // date in wrong format
            var dateSplit = this.state.date.split("-");
            var date = dateSplit[1] + "/" + dateSplit[2] + "/" + dateSplit[0];

            var newReceipt = {
                id: this.props.lastReceiptID + 1,
                name: this.state.name,
                date: date,
                total: total,
                category: this.state.category,
                description: this.state.description,
                file: {
                    name: this.state.fileName,
                    type: this.state.fileType,
                    size: this.state.fileSize,
                }
            };

            this.props.addReceipt(newReceipt);

            // var joined = this.state.receipts.concat(newReceipt);
            // this.setState({ receipts: joined });
            this.handleClose();
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        var value = target.value;
        this.setState({
            [name]: value
        });
    }

    handleCategorySelect(event) {
        const value = event.target.id;
        if (this.state.category === value) {
            this.setState({category: ''});
        } else {
            this.setState({category: value});
        }

    }

    handleFiles(event) {
        const file = event.currentTarget.files[0];
        this.setState({fileName: file.name});
        this.setState({fileType: file.type});
        this.setState({fileSize: file.size});
    }

    onAmountInputChange(e){
        const re = /^\$?\-?([1-9]{1}[0-9]{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\-?\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))$|^\(\$?([1-9]{1}\d{0,2}(\,\d{3})*(\.\d{0,2})?|[1-9]{1}\d{0,}(\.\d{0,2})?|0(\.\d{0,2})?|(\.\d{1,2}))\)$/

        if (e.target.value === '' || re.test(e.target.value))  {
            e.target.value = e.target.value;
        } else {
            e.target.value = '';
        }

        this.setState({total: e.target.value});
    }

    render() {
        return (
            <form>
                <Form.Row>
                    <Col xs="6">
                        <div className="form-group">
                            <label htmlFor="fileInput">Receipt File*</label>
                            <input type="file" className="form-control-file" id="fileInput"
                                   ref="fileInput"
                                   onChange={e => this.handleFiles(e)} required/>
                        </div>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs="6">
                        <div className="form-group">
                            <label htmlFor="vendorRetailer">Vendor/Retailer*</label>
                            <input type="text" name="name" className="form-control" id="vendorRetailer"
                                   ref="vendorRetailer"
                                   placeholder="Vendor" onChange={e => this.handleChange(e)} required/>
                        </div>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs="6">
                        <div className="form-group">
                            <label htmlFor="datePicker">Transaction Date*</label>
                            <div className="calendar-form-container">
                                <input type="date" name="date" className="form-control" id="datePicker"
                                       ref="datePicker"
                                       onChange={e => this.handleChange(e)}
                                       onClick={() => setMaxDate("datePicker")} required/>
                                <FontAwesomeIcon class="calendar-icon" icon={faCalendar}/>
                            </div>
                        </div>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Col xs="6">
                        <div className="form-group">
                            <label htmlFor="amountInput">Receipt Total ($USD)*</label>
                            <div className="calendar-form-container">
                                <input type="text" name="total" className="form-control"
                                       id="amountInput" ref="amountInput"
                                       onChange={this.onAmountInputChange}
                                       onBlur={() => amountSetMoney()} placeholder="Receipt Total"
                                       required/>
                            </div>
                        </div>
                    </Col>
                </Form.Row>
                <Form.Label>Category</Form.Label>
                <Form.Row>
                    {/*Add the selected class based on the category state change*/}
                    <Col xs="4">
                        <button type="button" id="Supplies"
                                onClick={e => this.handleCategorySelect(e)}
                                className=
                                    {(() => {
                                        if (this.state.category == "Supplies") {
                                            return (
                                                "subscription-btn btn btn-light category-btn selected"
                                            )
                                        } else {
                                            return (
                                                "subscription-btn btn btn-light category-btn"
                                            )
                                        }
                                    })()}
                        > Supplies
                        </button>
                    </Col>
                    <Col xs="4">
                        <button type="button" id="Subscriptions"
                                onClick={e => this.handleCategorySelect(e)}
                                className={(() => {
                                    if (this.state.category == "Subscriptions") {
                                        return (
                                            "subscription-btn btn btn-light category-btn selected"
                                        )
                                    } else {
                                        return (
                                            "subscription-btn btn btn-light category-btn"
                                        )
                                    }
                                })()}> Subscriptions
                        </button>
                    </Col>
                    <Col xs="4">
                        <button type="button" id="Personal"
                                onClick={e => this.handleCategorySelect(e)}
                                className={(() => {
                                    if (this.state.category == "Personal") {
                                        return (
                                            "subscription-btn btn btn-light category-btn selected"
                                        )
                                    } else {
                                        return (
                                            "subscription-btn btn btn-light category-btn"
                                        )
                                    }
                                })()}> Personal
                        </button>
                    </Col>
                </Form.Row>
                <Form.Row>
                    <Form.Group as={Col} md="12">
                        <Form.Label>Description</Form.Label>
                        <Form.Control as="textarea" name="description"
                                      onChange={e => this.handleChange(e)} rows="3"/>
                    </Form.Group>
                </Form.Row>
                <Form.Label>* Indicates a required field</Form.Label>
                <Form.Row>
                    <Col md="6" xs="4">
                    </Col>
                    <Col md="6" xs="8">
                        <div className="button-container">
                            <button type="button" onClick={e => this.handleClose()}
                                    className="btn btn-secondary cancel-btn">
                                Cancel
                            </button>
                            <button type="button" onClick={e => this.handleSubmit(e)}
                                    className="btn btn-primary submit-btn">
                                Add Receipt
                            </button>
                        </div>
                    </Col>
                </Form.Row>
            </form>
        );
    }
}
export default AddReceiptForm;
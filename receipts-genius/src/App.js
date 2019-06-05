import React, {Component} from 'react';
import './App.css';
import Header from './components/Header';
import SubHeader from './components/SubHeader'
import ReceiptContainer from './components/Receipts'
import AddReceiptForm from './components/AddReceiptForm'
import  {formatMoney} from './scripts/utilityFunctions'
import Modal from "react-bootstrap/Modal";

class App extends Component {

    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addReceipt = this.addReceipt.bind(this);
        this.deleteReceipt = this.deleteReceipt.bind(this);

        this.state = {
            receipts: [],
            lastReceiptID: 0,
            modalShow: false,
            deleteID: "",
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

    componentDidMount() {
        fetch('/api/receipts')
            .then(res => {
                return res.json()
            })
            .then(receipts => {
                this.setState({ receipts: receipts })
                var id = (receipts[receipts.length-1].id + 1)
                this.setState({lastReceiptID: id})
            });
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    addReceipt(receipt) {
        var joined = this.state.receipts.concat(receipt);
        this.setState({ receipts: joined });
    }

    deleteReceipt(id) {
        var newReceipts = this.state.receipts.filter(function(receipt) {
            if (receipt.id != id) {
                return receipt
            }
        });
        this.setState({receipts: newReceipts});
    }

    render() {
        return (
            <div className="App-main">
                <Header/>
                <div className="App-body">
                    <SubHeader onClick = {this.handleShow} reportTotal = {formatMoney(this.state.receipts.reduce((prev, next) => prev + next.total, 0).toFixed(2))} />
                    <ReceiptContainer
                        receipts = {this.state.receipts}
                        onDeleteClick={this.deleteReceipt}
                    />
                </div>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Receipt</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <AddReceiptForm
                            addReceipt={this.addReceipt}
                            closeModal={this.handleClose}
                            lastReceiptID={this.state.lastReceiptID}
                        />
                    </Modal.Body>
                </Modal>
            </div>
        );
    }
}
export default App;

import React, {Component} from 'react';
import './App.css';
import Receipts from './components/receipts';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReceipt} from "@fortawesome/free-solid-svg-icons";

class App extends Component {

    state = {

    }

    render() {
        return (
            <div className="App-main">
                <div className="App-header">
                    <center><h4 className="receipt-genius-header"><FontAwesomeIcon icon={faReceipt}/> <em>Receipt</em>Genius
                    </h4></center>
                </div>

                <Receipts />
            </div>
        );
    }
}
export default App;

import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faReceipt} from "@fortawesome/free-solid-svg-icons";

const Header = props => (
    <div className="App-header">
        <center>
            <h4 className="receipt-genius-header"><FontAwesomeIcon icon={faReceipt}/> <em>Receipt</em>Genius</h4>
        </center>
    </div>
);

export default Header;
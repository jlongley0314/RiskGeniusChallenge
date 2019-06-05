import React from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";

const SubHeader = ({ onClick, reportTotal }) => (
    <div className="sub-header">
        <button type="button" className="add-receipt-btn btn btn-light" onClick={onClick}>
            <FontAwesomeIcon icon={faPlus}/> Add Receipt
        </button>
        <div className="total-container">
            <h5 className="total-text">
                Report
                Total: <strong>${reportTotal}</strong>
            </h5>
        </div>
    </div>
);

export default SubHeader;
import React from 'react'
import {faFilePdf, faTrash} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileImage} from "@fortawesome/free-regular-svg-icons";
import {formatMoney, showTrashCan} from "../scripts/utilityFunctions";


const ReceiptsContainer = ({ receipts, onDeleteClick }) => (
    <div className="receipts-container">
        {receipts.map((receipt) => (
            <div id={receipt.id} className="single-receipt-container"
                 onMouseEnter={() => showTrashCan(true, receipt.id)}
                 onMouseLeave={() => showTrashCan(false, receipt.id)}>
                <div onClick={() => onDeleteClick(receipt.id)} className="receipt-container-trash">
                    <FontAwesomeIcon icon={faTrash}/>
                </div>
                <div className="receipt-img-container">
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
                <div className="receipt-body">
                    <p className="receipt-name">{receipt.name}</p>
                    <p className="receipt-date">{receipt.date}</p>
                    <p className="receipt-amount">${formatMoney(receipt.total)}</p>
                    {(() => {
                        if (receipt.category != "") {
                            return (
                                <div className="category-container">
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
);

export default ReceiptsContainer
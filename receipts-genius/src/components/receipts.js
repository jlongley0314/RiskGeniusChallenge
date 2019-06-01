import React from 'react'
import {faFilePdf, faPlus, faTrash, faReceipt} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faFileImage} from "@fortawesome/free-regular-svg-icons";

const Receipts = ({ receipts }) => {

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
        <div class="App-main">
            <div class="App-header">
                <center><h4 class="receipt-genius-header"><FontAwesomeIcon icon={faReceipt} /> <em>Receipt</em>Genius</h4></center>
            </div>

            <div class="App-body">
                <div class="sub-header">
                    <button class="add-receipt-btn btn btn-light"><FontAwesomeIcon icon={faPlus} /> Add Receipt</button>
                    <div class="total-container">
                        <h5 class="total-text">
                            Receipt Total: <strong>${formatMoney(receipts.reduce((prev,next) => prev + next.total,0).toFixed(2))}</strong>
                        </h5>
                    </div>
                </div>
                <div class="receipts-container">
                {receipts.map((receipt) => (
                    <div id={receipt.id} class="single-receipt-container" onMouseEnter={() => showTrashCan(true, receipt.id)} onMouseLeave={() => showTrashCan(false, receipt.id)}>
                        <div class="receipt-container-trash">
                            <FontAwesomeIcon icon={faTrash} />
                        </div>
                        <div class="receipt-img-container">
                            {(() => {
                                if (receipt.file.type == "application/pdf") {
                                    return (
                                        <FontAwesomeIcon class="receipt-img" icon={faFilePdf} />
                                    )
                                } else {
                                    return (
                                        <FontAwesomeIcon class="receipt-img" icon={faFileImage} />
                                    )
                                }
                            })()}
                        </div>
                        <div class="receipt-body">
                            <p class="receipt-name">{receipt.name}</p>
                            <p className="receipt-date">{receipt.date}</p>
                            <p className="receipt-amount">${formatMoney(receipt.total)}</p>
                            <p className="receipt-category">{receipt.category}</p>
                            <p className="receipt-description">{receipt.description}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
};

export default Receipts
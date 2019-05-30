import React from 'react'

const Receipts = ({ receipts }) => {
    return (
        <div class="App-main">
            <div class="App-header">
                <center><h3><em>Receipt</em>Genius</h3></center>
            </div>

            <div class="App-body">
                <div class="sub-header">

                </div>
                <div class="receipts-container">
                {receipts.map((receipt) => (
                    <div class="single-receipt-container">
                        <div class="receipt-body">
                            <h5 class="card-title">{receipt.name}</h5>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
};

export default Receipts
import React from 'react'

const Receipts = ({ receipts }) => {
    return (
        <div>
            <center><h1>Receipt List</h1></center>
            {receipts.map((receipt) => (
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{receipt.name}</h5>
                        {/*<h6 class="card-subtitle mb-2 text-muted">{contact.email}</h6>*/}
                        {/*<p class="card-text">{contact.company.catchPhrase}</p>*/}
                    </div>
                </div>
            ))}
        </div>
    )
};

export default Receipts
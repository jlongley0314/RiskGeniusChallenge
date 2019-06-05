import React from 'react';
import ReactDOM from 'react-dom';
import AddReceiptForm from '../components/AddReceiptForm';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AddReceiptForm />, div);
    ReactDOM.unmountComponentAtNode(div);
});

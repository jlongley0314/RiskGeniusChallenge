import React from 'react';
import ReactDOM from 'react-dom';
import SubHeader from '../components/SubHeader';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SubHeader />, div);
    ReactDOM.unmountComponentAtNode(div);
});

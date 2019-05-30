import React, {Component} from 'react';
import './App.css';
import logo from './logo.svg';
import Receipts from './components/receipts';

class App extends Component {

    state = {
        receipts: []
    }

    componentDidMount() {
        fetch('/api/receipts')
            .then(res => {
                console.log(res);
                return res.json()
            })
            .then(receipts => {
                console.log(receipts);
                this.setState({ receipts })
            });
    }

    render() {
        return (
            <Receipts receipts={this.state.receipts} />
        );
    }
}
export default App;

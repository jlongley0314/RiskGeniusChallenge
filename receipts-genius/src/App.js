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

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         name: '',
    //         greeting: ''
    //     };
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    // }
    //
    // handleChange(event) {
    //     this.setState({ name: event.target.value });
    // }
    //
    // handleSubmit(event) {
    //     event.preventDefault();
    //     fetch(`/api/greeting?name=${encodeURIComponent(this.state.name)}`)
    //         .then(response => response.json())
    //         .then(state => this.setState(state));
    // }

    render() {
        return (
            <Receipts receipts={this.state.receipts} />
        );

        // return (
        //     <div className="App">
        //         <header className="App-header">
        //             <img src={logo} className="App-logo" alt="logo" />
        //             <p>
        //                 Edit <code>src/App.js</code> and save to reload.
        //             </p>
        //             <form onSubmit={this.handleSubmit}>
        //                 <label htmlFor="name">Enter your name: </label>
        //                 <input
        //                     id="name"
        //                     type="text"
        //                     value={this.state.name}
        //                     onChange={this.handleChange}
        //                 />
        //                 <button type="submit">Submit</button>
        //             </form>
        //             <p>{this.state.greeting}</p>
        //             <a
        //                 className="App-link"
        //                 href="https://reactjs.org"
        //                 target="_blank"
        //                 rel="noopener noreferrer"
        //             >
        //                 Learn React
        //             </a>
        //         </header>
        //     </div>
        // );
    }
}
export default App;

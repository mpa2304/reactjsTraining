import React, { Component } from 'react';
import './App.css';
import LoginControl from './components/LoginControl';
import Data from './localData/Data';
import TodoList from './components/TodoList';
import Form from './components/Form';
import MoneyCalculator from './components/MoneyCalculator';
import FilterableProductTable from './components/FilterableProductTable';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const data = new Data();

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      isClockStopped: false
    };
    this.stopClock = this.stopClock.bind(this);
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  stopClock() {
    clearInterval(this.timerID);
    this.setState({
      isClockStopped: !this.state.isClockStopped
    })
  }

  render() {
    const Home = () => (
      <div>
        <h1>Clock</h1>
        <h2>It is {this.state.date.toString()}</h2>
        <button onClick={this.stopClock} disabled={this.state.isClockStopped}>Stop Clock!</button>
      </div>
    );

    return (
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/list_and_keys_1">Lists and keys (without keys)</Link>
            </li>
            <li>
              <Link to="/list_and_keys_2">Lists and keys (with keys generated)</Link>
            </li>
            <li>
              <Link to="/forms_controlled_components">Forms - Controlled Components</Link>
            </li>
            <li>
              <Link to="/lifting_state_up">Lifting state up</Link>
            </li>
            <li>
              <Link to="/thinking_in_react">Thinking in React</Link>
            </li>
          </ul>

          <hr />

          <Route exact path="/" component={Home} />
          <Route path="/login" component={LoginControl} />
          <Route path="/list_and_keys_1" render={()=><TodoList data={data.dataWithOutKey()} title={'List data without keys'}/>}/>
          <Route path="/list_and_keys_2" render={()=><TodoList data={data.dataWithKey()} title={'List data with keys'}/>}/>
          <Route path="/forms_controlled_components" render={()=><Form inputMin={6} textareaMin={20}/>}/>
          <Route path="/lifting_state_up" component={MoneyCalculator} />
          <Route path="/thinking_in_react" render={() => <FilterableProductTable products={data.getProducts()} />} />
        </div>
      </Router>
     
    );
  }
}

export default App;
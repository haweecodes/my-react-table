import React from 'react';
import DataTable from './Components/DataTable';
import './App.css';

class App extends React.Component {
  state = {
    headers: ['Date', 'Teams', 'Score'],
    list: [],
    title: '',
  }
  
  componentDidMount(){
    fetch('https://raw.githubusercontent.com/openfootball/football.json/master/2015-16/en.1.json')
      .then(result => result.json())
        .then((response) => {
          this.setState({
            title: response.name,
            list: response.rounds,
          })
        }).catch((err) =>{
          console.log(err);
        })
  }

  render(){
    return (
      <div className="App">
        <h1>{this.state.title}</h1>
        {/* pass headers and data */}
        <DataTable headers={this.state.headers} items={this.state.list}/>
      </div>
    );
  }
}

export default App;

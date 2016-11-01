import React, { Component } from 'react'
// import logo from './logo.svg'
// import './App.css'
import './main.css'

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <div className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h2>Welcome to React</h2>
//         </div>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     )
//   }
// }

class App extends Component {
  state = { msgs: [{
      email: "elik@bigpanda.io", content: "Yo madafacka wasup"
    },{
      email: "Shai@bigpanda.io", content: "Yo madafacka wasup2"
    },{
      email: "noam@bigpanda.io", content: "Yo madafacka wasup3"
    }]
  }
  onMessage(msg) {
    this.setState({ msgs: this.state.msgs.concat(msg) })
  }
  render() {
    //TODO connect to db
    return (
      <div className="app">
        <MsgBox onMessage={this.onMessage.bind(this)} />
        <Msgs msgs={this.state.msgs} />
      </div>
    )
  }
}
class MsgBox extends Component {
  render() {
    return (
      <div className="top-input">
        <input type="email" name="email" placeholder="Email" className="field" onChange={({ target: { value: email }}) => this.setState({email})} />
        <textarea name="content" placeholder="Message" className="field" onChange={({ target: { value: content }}) => this.setState({content})}></textarea>
        <button className="submit" onClick={() => this.state && this.props.onMessage(this.state)}>SUBMIT</button>
      </div>
    )
  }
}
const Msg = ({ profileImg, email, message }) =>
  <div className="msg">
    <img src={profileImg} />
    <div className="msg-text">
      <div className="msg-title">{email}</div>
      <div className="msg-content">{message}</div>
    </div>
  </div>

class Msgs extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: ''
    }
  }
  onChange({ target:{ value } }) {
    this.setState({ filter: value })
  }
  render() {
    const msgs = this.state.filter
      ? this.props.msgs.filter(msg => 
        msg.email.indexOf(this.state.filter) !== -1
        || msg.content.indexOf(this.state.filter) !== -1
      )
      : this.props.msgs

    return (
      <div className="bottom-msgs">
        <input type="text" name="filter" placeholder="Filter" onChange={this.onChange.bind(this)} />
        <div className="msgs">
          { msgs.map(msg => 
          <Msg profileImg={msg.profileImg} email={msg.email} message={msg.content} />
          )}
        </div>
      </div>
    )
  }
}

export default App

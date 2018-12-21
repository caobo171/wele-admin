import React from "react";


export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Create Your Page</h1>
        <button onClick={()=>{
            window.open('/create')
        }}>Create A New Page </button>
      </div>
    );
  }
}

import React from "react";


export default class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h1>Create Your Page</h1>
        <button onClick={()=>{
            const shop = JSON.parse((localStorage.getItem('shop') as any).toString())
            window.open(`/create?shop=${shop}`)
        }}>Create A New Page </button>
      </div>
    );
  }
}

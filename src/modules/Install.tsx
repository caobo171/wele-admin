import React from 'react'



class Install extends React.Component{
    state = {
        shop:''
    }
    handleSubmit= ()=>{
       window.location.href = `/shopify/auth?shop=${this.state.shop}`
    }
    handleOnChange = (e:any)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        return(
            <div>
                <input type="text" name="shop" value = {this.state.shop} onChange={this.handleOnChange}/>
                <button type="submit" onClick={this.handleSubmit}>Install</button>
            </div>
        )
    }
}

export default Install

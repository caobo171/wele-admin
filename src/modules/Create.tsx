import React from 'react'
import axios from 'axios'

class Create extends React.Component{
    state={
        request:'',
        data:'',
        type:'POST',
        result:''
    }
    onClickHandle = ()=>{
        console.log('check',this.state)
        switch(this.state.type){
            case 'GET':
               axios.get(`/api/${this.state.request}`).then(data=>{
                   this.setState({data})
               })
               break;
            case 'POST':
                //const datatoSend = JSON.parse(this.state.data)
                if(true){
                    axios.post(`/api/${this.state.request}`).then(data=>{
                        this.setState({data})
                    })
                }
              
        }
    }

    handleChange = (e:any)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        return(
            <div>
                <select name='type' value={this.state.type} onChange={this.handleChange}>
                    <option value="GET">get</option>
                    <option value="POST">post</option>
                </select>
                <input name='request' type='text' value={this.state.request}
                onChange={this.handleChange} placeholder='end point'/>
                <textarea name='data' value={this.state.data} placeholder='your data '
                onChange={this.handleChange}></textarea>
                <button onClick={this.onClickHandle}>Send Request</button>
                <textarea defaultValue={this.state.result} placeholder='Result will come here'></textarea>
            </div>
        )
    }
}
export default Create 
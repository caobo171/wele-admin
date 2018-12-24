import React from 'react'
import {pageContainer} from '../../containers/PageContainer-x'
import {toast} from 'react-toastify'



class Menu extends React.Component{

    state = {
      content:''
    }

    handleSavePage = ()=>{
        console.log('check Save Page ok')
          pageContainer.getPageData()
          toast.success("Save Page Successfull!", {
            position: toast.POSITION.TOP_LEFT
          });
       
    }

    
    handleViewPage = ()=>{
      const{shop,title} = pageContainer.state
      window.open(`https://${shop}/pages/${title}`)
    }

    handleOnChangeTitle = (e:any)=>{
      pageContainer.setState({title:e.target.value})
    }
    render(){
     
        return(
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"
                onDrop= {(event)=>{
                    event.preventDefault();
                    console.log('drop OKKK')}}>
                  <h1 className="h2">Dashboard</h1>
                  <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.handleSavePage}>Save</button>
                      <button type="button" className="btn btn-sm btn-outline-secondary" onClick={this.handleViewPage}>ViewPage</button>
                      
                    </div>
                    <input type="text" onChange={this.handleOnChangeTitle} className="btn btn-sm " placeholder='your page title'></input>
                  </div>
                </div>
        )
    }
}

export default Menu
import React from 'react'
import Inspector from './Inspector';



class Sidebar extends React.Component{

    state = {
      content:''
    }
    onDrag= (e:any)=>{
        console.log('check',e.target)
        const dataTransfer = (e.target as HTMLElement).getAttribute('data-template') || ((e.target as HTMLElement).parentElement as any).getAttribute('data-template')
        console.log('check',dataTransfer)
        window.target = e.target 
        e.dataTransfer.setData("template", dataTransfer);
    }
    render(){
     
        return(
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
            <div className="sidebar-sticky">
            <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                <span>Template List</span>
                <a className="d-flex align-items-center text-muted" href="#">
                  <span data-feather="plus-circle"></span>
                </a>
              </h6>
              <ul className="nav flex-column" >
                <li className="nav-item"  draggable= {true} data-template='template1' onDragStart={this.onDrag}>
                  <a className="nav-link active" href="#">
                    <span data-feather="home"></span>
                    1st Template <span className="sr-only" >(current)</span>
                  </a>
                </li>
                <li className="nav-item"   draggable= {true} data-template='template2' onDragStart={this.onDrag}>
                  <a className="nav-link active" href="#">
                    <span data-feather="home"></span>
                    2st Template <span className="sr-only">(current)</span>
                  </a>
                </li>
                <li className="nav-item"   draggable= {true} data-template='template3' onDragStart={this.onDrag}>
                  <a className="nav-link active" href="#">
                    <span data-feather="home"></span>
                    3st Template <span className="sr-only">(current)</span>
                  </a>
                </li>
               
              </ul>
              <Inspector/>
      
            </div>
          </nav>
      
        )
    }
}

export default Sidebar
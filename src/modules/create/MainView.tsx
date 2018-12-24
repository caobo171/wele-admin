import React, { RefObject } from 'react'
import ReactDOM from 'react-dom'
import { readFile, addHeaderToHTML } from '../../utils/helper';
import { renderElement } from '../../utils/renderElement'
import { SubscribeOne } from 'unstated-x'
import PageContainer,{pageContainer, pageRef} from '../../containers/PageContainer-x'





class MainView extends React.Component {

  state = {
    content: '',
    doc: null,
    box2:{
      left:0,
      top:0,
      width:0,
      height:0,
      zIndex:0
    },
    target:null

  }
  handleIframeLoad = () => this.setState({ doc: this.document })

  get document() {
    return pageRef.current && pageRef.current.contentDocument
  }

  get window() {
    return pageRef.current && pageRef.current.contentWindow
  }



  componentWillUnmount() {

    //@ts-ignore
   pageRef.current.removeEventListener('load', this.handleIframeLoad, true)
  }

  handleDrop = (e: any) => {
    e.preventDefault()

    const template = e.dataTransfer.getData("template");
    if(template){
      console.log('check DROP okoks', template)
      if (pageContainer.state.template !== template) {
        pageContainer.setState({ template }, () => {
          readFile(`/templates/${pageContainer.state.template}.html`).then((data: any) => {
            const content = addHeaderToHTML(data)
            this.setState({ content:data })
          })
        })
  
      }
    }
  }

  handleMouseDown = (e:any) =>{
    e.preventDefault()
    console.log('check',e.target)
    window.tar = e.target
    if(e.target.id==='boundingbox2'){
      console.log('BIEN MAT DI NAO')
      this.setState({box2:{
        left:0,
        top:0,
        width:0,
        height:0,
        zIndex:-1
      }})
    }else{
      pageContainer.setState({target:e.target as HTMLElement},()=>{
        console.log('check',pageContainer.state.target)
     //   pageContainer.state.target.style.color= 'red'
      })
      let box2 = (e.target as HTMLElement).getBoundingClientRect()
      console.log('check',(this.window as Window).scrollY)
      //box.top = box.top+ (this.window as Window).scrollY
  
      this.setState({box2:{
        left:box2.left + (this.window as Window).scrollX,
        top:box2.top + (this.window as Window).scrollY,
        width:box2.width,
        height:box2.height,
        zIndex:e.target.style.zIndex+1
      }})
    }

  }


  componentDidMount() {
    //@ts-ignore
    pageRef.current.addEventListener('load', this.handleIframeLoad, true)
    // window.frame = this.frameRef
  }
  render() {
    const { doc, content,box2 } = this.state
    return (
      <iframe

        style={{
          height: '500px',
          border: 'none',
          width: '100%'
        }}
        ref={pageRef}
        srcDoc={`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge"><link rel="stylesheet" 
            href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" 
            integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">
      
            <title>Document</title>
        </head>
        <body id='__pf-x__'>
        </body>
        </html>
        `}
      >
        {!doc ? null : ReactDOM.createPortal(
          <SubscribeOne to={PageContainer} bind={['template']}>
            {pageContainer => {
              return (
                <div
                  onDragOverCapture={e=>e.preventDefault()}
                  onDropCapture={this.handleDrop}
                  onMouseDown= {this.handleMouseDown}
                  style={pageContainer.state.length > 1 ? {} : {
                    height: '500px'
                  }}

                >
                  <React.Fragment>
                  <div id="boundingbox2" style={{
                      position:"absolute",
                      boxShadow: "0 0 0 3px green inset",
                      display: "flex",
                      flexWrap:'wrap',
                      justifyContent:'center',
                      overflow:'auto',
                      cursor:'pointer',
                      top:`${box2.top}px`,
                      left:`${box2.left}px`,
                      width:`${box2.width}px`,
                      height:`${box2.height}px`,
                      zIndex:box2.zIndex
                    }}></div>
                    {renderElement(content)}
                  </React.Fragment>

                </div>
              )
            }}
          </SubscribeOne>


          , (doc as any).body)}
      </iframe>
    )
  }
}

export default MainView
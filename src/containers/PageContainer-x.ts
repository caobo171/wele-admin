import {Container } from 'unstated-x'
import React,{ RefObject } from 'react';
import {savePage} from './../utils/client'
import axios from 'axios'



interface PageState{
  template:string
  title:string
  shop:string
  id:string
  target:HTMLElement
}



class PageContainer extends Container<PageState>{
    
    async getPageData(){
        if(pageRef){
          console.log('check',(pageRef.current as any).contentDocument)
          window.pageRef = pageRef
          const pageDocument : Document = (pageRef.current as any).contentDocument
          const rootElement = pageDocument.getElementById('__pf-x__')
          console.log('check',rootElement)
          window.root = rootElement
          if(rootElement){
            const saveData = rootElement.innerHTML

            const page = await savePage(this.state.shop,saveData,this.state.title)
            console.log('save OKKK Page',page)
          }

       
        }
    }
}

export let pageRef:RefObject<HTMLIFrameElement> = React.createRef()
export let pageContainer = new PageContainer()
export default PageContainer
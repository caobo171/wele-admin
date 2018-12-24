import React, { ReactNode } from 'react'
var HtmlToReact = require('html-to-react');
var HtmlToReactParser = require('html-to-react').Parser;
export  function renderElement(html:string){
 
   //const html = `<h1 class="blabla">I'AM CAO BO</h1>`
   const htmlToReactParser = new HtmlToReactParser()
   const reactElement =  htmlToReactParser.parse(html)
  return (
     <React.Fragment>
       {reactElement}
     </React.Fragment>
  )
}


function renderReactElement(children:[ReactNode],){
    
}


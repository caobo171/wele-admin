import React from 'react'
export function addHeaderToHTML(content:String){
  const newContent = `
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
      ${content}
  </body>
  </html>
  `
  return newContent
}



export function readFile(pathFile:string){
    return new Promise((resolve, reject) => {
      var rawFile = new XMLHttpRequest();
      rawFile.open("GET", pathFile, false);
      //console.log('long', this.classPath);
      rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4) {
          if (rawFile.status === 200 || rawFile.status === 0) {
            resolve(rawFile.responseText);
          }
        }
      };
      rawFile.send(null);
    });
  };

export function createElement(innerHTML:string){
  let div = React.createElement('div')
   
   console.log('check',div)
   return div
}



"use estrito" ;


var  url  =  require ( "url" )
var  http  =  requer ( "http" )
var  hogan  =  require ( "hogan.js" )
var  github  =  require ( "github-url-to-object" )
var  bitbucket  =  require ( "bitbucket-url-to-object" )
var  superagent  =  require ( "superagent" )
var  addons  =  require ( "./lib/addons" )
var  schema  =  require ( "./lib/schema" )

var  App  =  módulo . exportações  =  requerer ( "./lib/app" )

App . protótipo . getAddonPrices  =  function ( cb )  {
  var  _this  =  this
  App . addons . getPrices ( this . addons ,  function ( err ,  prices ) {
    if  ( err )  return  cb ( err )
    _isso . preços  =  preços
    cb ( nulo ,  preços )
  } )
}

App . fetch  =  function ( repositório ,  cb )  {
  if  ( github ( repositório ) )  {
    repositório  =  github ( repositório )
  }  else  if  ( bitbucket ( repositório ) )  {
    repositório  =  bitbucket ( repositório )
  }  else  {
    return  cb ( "Um GitHub ou Bitbucket URL válido é necessário:"  +  repositório )
  }

  var  fetcher_url  =  url . formato ( {
    protocolo : "https" ,
    hostname : "app-json-fetcher.herokuapp.com" ,
    consulta : {
      repositório : repositório . https_url
    }
  } )

  superagente . get ( fetcher_url ,  function ( res ) {
    cb ( nulo ,  App . novas ( res . corpo ) )
  } )
}

// Modelos Hogan FTW
App . templates  =  { }
if  ( módulo . pai )  {
  App . modelos . app  =  hogan . compilar ( fs . readFileSync ( __dirname  +  '/templates/app.mustache.html' ) . toString ( ) )
  App . modelos . build  =  hogan . compilar ( fs . readFileSync ( __dirname  +  '/templates/build.mustache.html' ) . toString ( ) )
  App . modelos . esquema  =  hogan . compilar ( fs . readFileSync ( __dirname  +  '/templates/schema.mustache.html' ) . toString ( ) )
}  else  {
  App . modelos . app  =  require ( './templates/app.mustache.html' )
  App . modelos . build  =  require ( './templates/build.mustache.html' )
  App . modelos . schema  =  require ( './templates/schema.mustache.html' )
}

App . addons  =  addons

'use strict';

let myform = document.getElementById( 'form' );
let headerArr = ['Item Name' , 'Category', 'Quantity', 'Price'];
let myTable = document.getElementById( 'myTable' );
let myP = document.getElementById( 'total' );
let allObj = [];

function Obj ( item, category, quantity ) {
  this.item=item;
  this.category=category;
  this.quantity=quantity;
  this.price= randomNum( quantity );
  allObj.push( this );
}

Obj.prototype.render = function(){
  let tr = document.createElement( 'tr' );

  let td = document.createElement( 'td' );
  td.textContent = `${this.item}`;

  let td2 = document.createElement( 'td' );
  td2.textContent = `${this.category}`;

  let td3 = document.createElement( 'td' );
  td3.textContent = `${this.quantity}`;

  let td4 = document.createElement( 'td' );
  td4.textContent = `${this.price}`;

  tr.appendChild( td );
  tr.appendChild( td2 );
  tr.appendChild( td3 );
  tr.appendChild( td4 );

  myTable.appendChild( tr );
  myP.textContent = `${total()}`;

};

function handleClick( event ){
  event.preventDefault();

  let itemName = event.target.itemName.value;
  let category = event.target.category.value;
  let quantity = event.target.quantity.value;

  let newItem = new Obj ( itemName, category, quantity );
  newItem.render();

  localStorage.setItem( 'data', JSON.stringify( allObj ) );
//   console.log( newItem );
}

function newRender(){
  for ( let i=0; i < allObj.length ;i++ ) {
    let tr = document.createElement( 'tr' );

    let td = document.createElement( 'td' );
    td.textContent = allObj[i].item;

    let td2 = document.createElement( 'td' );
    td2.textContent = allObj[i].category;

    let td3 = document.createElement( 'td' );
    td3.textContent = allObj[i].quantity;

    let td4 = document.createElement( 'td' );
    td4.textContent = allObj[i].price;

    tr.appendChild( td );
    tr.appendChild( td2 );
    tr.appendChild( td3 );
    tr.appendChild( td4 );

    myTable.appendChild( tr );

  }
  myP.textContent = `${total()}`;
}

function checkLS(){
  if( localStorage.getItem( 'data' ) ){
    allObj = JSON.parse( localStorage.getItem( 'data' ) );
    console.log( allObj );
    newRender();
    // allObj.render();
  }
}

function tableHeader() {
  for ( let i =0; i < headerArr.length; i++ ){
    let thHeader = document.createElement( 'th' );
    thHeader.textContent = headerArr[i];
    myTable.appendChild( thHeader );
  }
}

function randomNum( quantity ) {
  return ( Math.ceil( Math.random() * ( 900 - 300 ) + 300 ) )*quantity;
}

function total(){
  let total=0;
  for( let i =0; i < allObj.length; i++ ) {
    total = ( total + allObj[i].price );
  }
  return total;
}
// console.log(randomNum());



tableHeader();
checkLS();
myform.addEventListener( 'submit', handleClick );

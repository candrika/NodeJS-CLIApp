const { resolve } = require('path');
var validator = require('validator');
var contacts =require('./data.js')
var yargs =require('yargs');
const { argv } = require('process');

//init main
const main= async()=>{
    // init yargs commands
    yargs.command({
        command:'add',
        describe:'Create new data',
        builder:{
            nama:{
                describe:"Nama Lengkap",
                demandOption:true,
                type:'string'
            },
            email:{
                describe:"Eamil",
                demandOption:false,
                type:'string' 
            }
        },
        handler(argv){
            contacts.saveData(argv.nama,argv.email);         
        }
    }).demandCommand();

    yargs.command({
        command:'list',
        describe:'Showing all datas record',
        handler(){
           console.log( contacts.listData());
        }
    }).demandCommand();

    yargs.parse();      
}

//call main function
main();
const { resolve } = require('path');
var validator = require('validator');
var contacts =require('./data.js')
var yargs =require('yargs');
const { argv } = require('process');

//init main
const main= async()=>{
    // init yargs commands
    //command to create new data
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

    //show/read all data
    yargs.command({
        command:'list',
        describe:'Showing all datas record',
        handler(){
           console.log( contacts.listData());
        }
    });
    
    // show/read detail data
    yargs.command({
        command:'detail',
        describe:'Show detail for single data',
        builder:{
            nama:{
                describe:'Show detail data using key word nama',
                demandOption:true,
                type:'string'
            }
        },
        handler(argv){
            // console.log(argv)
            contacts.detailData(argv.nama);
        }
    });

    //delete single data
    yargs.command({
        command:'delete',
        describe:'deleta for single data',
        builder:{
            nama:{
                describe:'delete single data using key word nama',
                demandOption:true,
                type:'string'
            }
        },
        handler(argv){
            // console.log(argv)
            contacts.deleteData(argv.nama);
        }
    })
    yargs.parse();      
}

//call main function
main();
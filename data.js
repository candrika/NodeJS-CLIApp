const fs  = require('fs');
const chalk = require('chalk'); 
const validator=require('validator');
// var readline  = require('readline');

let fileData='biodataMahasiswa.json';

const readFile=()=>{
    if(fs.existsSync(fileData)){
        // console.log('file exists')        
        const fileBuffer=fs.readFileSync(fileData,'utf-8');
        return fileBuffer;
    }else{
        fs.writeFileSync(fileData,'[]','utf-8');
        const fileBuffer=fs.readFileSync(fileData,'utf-8');
        return fileBuffer;
    }
}

//readline 
// const rl = readline.createInterface({
//     input:process.stdin,
//     output:process.stdout
// })

// const tulisPertanyaan=(pertanyaan)=>{
//     return new Promise((resolve,reject)=>{
//         rl.question(pertanyaan,(nama)=>{
//             resolve(nama);
//         });
//     });
// };

const saveData=(nama ,email)=>{
    const contact  = {nama, email};
    let fileBuffer = readFile();
    const contacts = JSON.parse(fileBuffer);
    const duplikat = contacts.find((contact)=> contact.nama===nama);

    // validate
    if(duplikat){
        console.log(chalk.red.inverse.bold('Nama sudah terdaftar silahkan gunakan nama lain'));
        return false;
    } 

    if(email!==""){
        if(!validator.isEmail(email)){
            console.log(chalk.blue.inverse.bold('Format email yang anda masukan salah'));
            return false;
        }
    }

    contacts.push(contact);
    fs.writeFileSync(fileData,JSON.stringify(contacts));
    console.log('data sudah sudah tersimpan');
}

const listData=()=>{
    let datas = readFile();
    dataObj   = JSON.parse(datas);
    const data= [];
    
    dataObj.forEach(obj => {
        data.push({"nama":obj.nama,"email":obj.email})
    });
    
    return data;
}


module.exports={
    // tulisPertanyaan,
    saveData,
    listData
}
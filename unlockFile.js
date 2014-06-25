#! /usr/bin/env node

var crypto = require('crypto'),
    fs = require('fs'),
    buffer = require('buffer');


var param = process.argv.slice(2);


if(param.length!=2){
    console.log('-- Invalid Argument --');}
else{

    fs.exists(param[0],function(exists){
        if(exists){
            //Reading File Content
            fs.readFile(param[0], function (err,data) {
                console.log(data.toString());

                //Decryption
                decipher = crypto.createDecipher('aes-192-cbc', param[1]);
                decoded = decipher.update(data.toString(), 'base64', 'utf8');
                decoded += decipher.final('utf8');
                console.log("Decrypt : " + decoded + "Password: " + param[1]);


                fs.writeFile(param[0],decoded, function (err) {
                    if(err)throw err;
                    //console.log(decrypt);
                });
            });
        }
        else{
            console.log("File Not Exixts.");
        }
    });
}




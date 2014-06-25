
var crypto = require('crypto'),
    fs = require('fs');


var param = process.argv.slice(2);


if(param.length!=2){
    console.log('-- Invalid Argument --');}
else{

    fs.exists(param[0],function(exists){
        if(exists){
            //Reading File Content
            fs.readFile(param[0], function (err,data) {
                console.log(data.toString());
                var CFR =  crypto.createCipher('aes192',param[1]);
                var encrypted = CFR.update(data, 'utf8', 'base64');
                encrypted+=CFR.final('base64');
                console.log("Encryption: " + encrypted + "Password: " + param[1]);
                fs.writeFile(param[0],encrypted.toString(), function (err) {
                    if(err)throw err;

                });


            });
        }
        else{
            console.log("File Not Exixts.");
        }
    });
}




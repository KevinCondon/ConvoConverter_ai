const FILE_NAME = 'bluesky-convo';
const path = './OUTPUT/' + FILE_NAME + '/';

//CHANGE TO CURRENT NAME

const fs = require('fs'); //Node.js
var readline = require('readline'); //Node.js
let rl = readline.createInterface(process.stdin, process.stdout);
var excelConvert = require('./excelConvert.js');
const JASON = require("./" + FILE_NAME); 

let location = null;
let locationArray = [];
let DOMArray = [];
let ExcelArray = []; //hacky code but gets job down

const entries = Object.entries(JASON)



for(var i=0; i < entries.length; i++){
    const key = entries[i]
    if(key[0] == 'locationMap'){
        location = key[1];
    for (const key in location){
        locationArray.push(key);
        }  
    }
    //'locationMap' in JSON is a Dictionary Type
    //Converts to Array for FillDOM

   if(key[0] == 'main'){
    
    DOMArray.push('<h2> Main </h2>')
    ExcelArray.push('Main');
    FillDOM(key[1], locationArray)
   }

   if(key[0] == 'branch'){
    DOMArray.push('<h2> Branch </h2>')
    ExcelArray.push('Branch');
    FillDOM(key[1], locationArray)
   }



}


function FillDOM(key, node){
    
    for (var i = 0; i < key.length; i++){

        DOMArray.push('<br> <div> <b>' + node[0] + '</b> </div>')
        ExcelArray.push(node[0])        
        node.shift();
        //Add first element of location then remove from stack

        DOMArray.push('<br> Customer Text: <div> <blockquote>' + key[i].customerText + ' </blockquote> </div> <br>');
        ExcelArray.push('Customer Text:');
        ExcelArray.push(key[i].customerText);
        //CUSTOMER TEXT

        DOMArray.push('Options <br>')
        ExcelArray.push('Options');

        for (var x = 0; x < key[i].options.length; x++) {
            DOMArray.push('<blockquote>');
            //DOMArray.push( key[i].options[x].text + '<br>')


            // if(!key[i].options[x].response.includes('Next') && +
            //     !key[i].options[x].response.includes('Back') && +
            //     !key[i].options[x].response.includes('Branch')){
                DOMArray.push('RESPONSE:' + key[i].options[x].response + '<br>')
                ExcelArray.push(key[i].options[x].response);

           // }
            DOMArray.push('</blockquote>');
        }
        //ITERATE THROUGH 'OPTION' && 'FEEDBACK'(if applicable) AND ADD TO DOM ARRAY
    


        DOMArray.push('<hr>');
            
    }
}

          
//Converts Array to String 
//Removes ',' that the array puts between each element

var arrayToStr = ''
DOMArray.forEach(element => arrayToStr += element);


CreateFolderPath(); 

fs.writeFile(path + FILE_NAME + '.html', arrayToStr, (err) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log('Success, Saved as: ' + FILE_NAME + '.html in' + path);        
    excelConvert.FillExcel(ExcelArray, path, FILE_NAME)
    }
);
function CreateFolderPath(){

    if (!fs.existsSync(path, (err) => {if (err) throw err;}))
        fs.mkdirSync(path);
}

// const ExportExcel = async () => {
//         var bool = false;
//         rl.setPrompt('Export to Excel: (Y/N): ');
//         rl.prompt();
//     for await (const line of rl) {
//         //rl.on('line', function (line) {
//             if (line === "Y" || line === "y")
//                 bool = true;

//             rl.close();
//         //})
//         return bool;
//     }



  
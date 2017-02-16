/**
* Analysis executor file for testing Underscore suite located in /libraries/underscore-master/test/
* Analyzed files: array.js, collections.js, chaining.js, cross-document.js, functions.js, objects.js, utility.js
*/

// Array of the Javascript files to analyse from Underscore test
var own_tests = ['arrays.js','chaining.js','collections.js','cross-document.js','functions.js','objects.js','utility.js'];
// Our Analyzer file
var analysis = 'analysis_hk1.js';
//The name of the merged outputs for all tests
var output_file = 'result_underscore.txt';

// Template of the command to execute jalangi-analysis (without file to test at the end)
var command = 'node jalangi2/src/js/commands/jalangi.js --inlineIID --inlineSource --analysis ' + analysis + ' ';

// Execute analysis synchrounous to merge the outputs
var execSync = require('exec-sync');
var fs = require('fs');

// Is there a built-in function similar to toString() for arrays???
var Output = {
    list: [],
    push: function(s) {
        Output.list.push(s);
    },
    toString: function() {
        var result = "";
        for (i in Output.list) {
            result = result + Output.list[i];
        }
        return result;
    }
};

// Main execution Sandbox
(function execute() {
    for (i in own_tests) {
        var test = own_tests[i];
        console.log("Analyzing: " + test);
        execSync(command + "libraries/underscore-master/test/" + test);
        var result = fs.readFileSync("result.txt");
        Output.push(" Results for : " + test + ":");
        Output.push(result + "\n\n");
        console.log("\t finished.");
        
        // Remove temporary files generated by Jalangi (Works fine)
        execSync("rm " + "libraries/underscore-master/test/" + test.split(".")[0] + "_*");
    }
    
    console.log(" Written in: " + output_file);
    fs.writeFileSync(output_file, Output.toString());
})();
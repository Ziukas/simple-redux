/**
 * My API Sandbox
 * 
 */










Sandbox.define('/person/{name}','GET', function(req, res) {
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(200);
    
    // Send the response body.
    res.json({
            "val1": "Akkerman_Clinic",
            "val2": "Dr_Akkerman"
        }
    
    );
})

Sandbox.define('/facility/{name}','GET', function(req, res) {
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(200);
    
    // Send the response body.
    res.json({
        "val3": "1110",
        "val4": "0.7"
    });
})



Sandbox.define('/exposure/{doctor}', 'GET', function(req, res) {
    // Set the type of response, sets the content type.
    res.type('application/json');
    
    // Set the status code of the response.
    res.status(200);
    
    // Send the response body.
    res.json({
        "val5": "Apologies, the doctor is currently missing."
    });
})

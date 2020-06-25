let parameterbox = document.getElementById('ParameterBox')
parameterbox.style.display = "none";

let JsonBox = document.getElementById('JsonBox');

// If the user clicks on params box, hide the json box
let checkparameter = document.getElementById('custom_parameters');
checkparameter.addEventListener('click', () => {
    parameterbox.style.display = 'block';
    JsonBox.style.display = 'none';
});
// If the user clicks on json box, hide the parametrs box
let JSON = document.getElementById('JSON');
JSON.addEventListener('click', () => {
    parameterbox.style.display = 'none';
    JsonBox.style.display = 'block';
    document.getElementById('Params').style.display = 'none'
});
//Convert the element string to DOM node
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

let paramcount = 0;
let addParam = document.getElementById('AddParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('Params');
    let string = `<div class="row my-2"  id="ParameterBox">
    <div class="col-sm-2 form">
        <h5>Parameter ${paramcount +2}</h5>
    </div>
    <div class="col-sm-4 form">
        <input type="text" class="form-control" id="Parameter_Key${paramcount +2}" placeholder="Enter The Parameter Key ${paramcount +2}">
    </div>
    <div class="col-sm-4 form">
        <input type="text" class="form-control" id="Parameter_Value${paramcount +2}" placeholder="Enter The Parameter Value ${paramcount +2}">
    </div>
    <div class="col-sm-1 form">
        <input type="button" class="btn btn-primary form-control deleteParam" value="-" id="AddParam">
    </div>
</div>`
    let paramElement = getElementFromString(string);
    params.appendChild(paramElement);
    paramcount++;
     // Add an event listener to remove the parameter on clicking - button
    let deleteparam = document.getElementsByClassName("deleteParam");
    for (item of deleteparam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.parentElement.remove();
        });

    }
});
document.getElementById('Submit').addEventListener('click', () => {
    let request = document.getElementById('sel1').value;
    let url = document.getElementById('Url').value;
    //let request = document.querySelector("input[name='request']:checked").value;
    let content = document.querySelector("input[name='content']:checked").value;
    // Show please wait in the response box to request patience from user
    document.getElementById('resultresponse').placeholder = 'Please Wait...........';
    if (content === 'custom_parameters') {
        data = {};
        for (let i = 0; i < paramcount + 1; i++) {
            let key = document.getElementById('Parameter_Key' + (i + 1)).value;
            let value = document.getElementById('Parameter_Value' + (i + 1)).value;
            data[key] = value;
        }
        // data = JSON.stringify(data);
        data = "" + data;
        console.log(typeof data);
    } else {
        data = document.getElementById('jsontext').value;
        console.log(data);
    }
    //if the request is GET invoked fetch api
    if (request == 'GET') {
        fetch(url, {
            method: 'GET'
        }).then(response => response.text()).
        then((text) => { document.getElementById('resultresponse').value = text });
    }
    //if the request is POST invoked fetch api
     else if (request == 'POST') {
        fetch(url, {
                method: 'POST',
                body: data,
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }).then(response => response.text())
            .then((text) => { document.getElementById('resultresponse').value = text });
    }
    //if the request is PUT invoked fetch api
     else if (request == 'PUT') {
        fetch(url, {
                method: 'PUT',
                body: JSON.parse(JSON.stringify(data)),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }).then(response => response.text())
            .then((text) => { document.getElementById('resultresponse').value = text });
    }
    //if the request is DELETE invoked fetch api
    else if (request == 'DELETE') {
        fetch(url, {
                method: 'DELETE',
                body: JSON.parse(JSON.stringify(data)),
                headers: { "Content-type": "application/json; charset=UTF-8" }
            }).then(response => response.text())
            .then((text) => { document.getElementById('resultresponse').value = text });
    }
    //if the request is PATCH invoked fetch api
     else {
        fetch(url, {
                method: 'PATCH',
                body: JSON.parse(JSON.stringify(data)),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => response.text())
            .then((text) => { document.getElementById('resultresponse').value = text });
    }

});
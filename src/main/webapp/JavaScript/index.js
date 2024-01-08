const errorMsg = document.getElementById("error-message");
const response = document.getElementById("response");
const submitButton= document.getElementById("submit-button");
const setRButton = document.getElementById("submit-r-button");
const yInput=document.getElementById("y-input-field");
const yError = document.getElementById("y-error");
const R = document.querySelectorAll('.r-button');

let yMarker = true;

R.forEach(function (button){
    button.addEventListener("click", function (){
        R.forEach(function (btn){
            btn.disabled=false;
            btn.classList.remove("disabled");
        })
        button.disabled = true;
        button.classList.add("disabled");

    })
})

window.onload = function (){
    drawAxes();
}

submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    const y = document.getElementById("y-input-field").value.replace(",", ".");
    let tmpR = document.querySelector(".r-button:disabled");

    if(!validateRSelection(tmpR)){
        return;
    }
    let r = tmpR.value;

    let xCheckboxes = document.getElementsByName("x");
    let selectedXValues = [];
    for (let i = 0; i < xCheckboxes.length; i++) {
        if (xCheckboxes[i].checked) {
            selectedXValues.push(xCheckboxes[i].value);
        }
    }

    if(validateFormValues(selectedXValues, y, r)){
        errorMsg.textContent = "Not all parameters are filled in!";
        return;
    }
    else {
        errorMsg.textContent = ""
    }

    let params = formData(selectedXValues, y, r);
    let tmpResponse = [];

    fetch(`controllerServlet?${params}`, {
        method: "GET"
    }).then(response => {
        if (!response.ok) {
            throw new Error("unlucky");
        }
        console.log(response);
        return response.text();
    })
        .then(data => {
            response.textContent = data;
            tmpResponse = data.split(';');
            let xs = tmpResponse[0].split(',');
            console.log(xs,tmpResponse[1], tmpResponse[2])
            drawGraph(tmpResponse[2]);
            drawDots(xs,tmpResponse[1], tmpResponse[2]);
        })
        .catch(error => {
            console.log("unlucky");
        });

    cleanFormData(xCheckboxes);
});

setRButton.addEventListener("click", function (e){
    e.preventDefault();

    let xCheckboxes = document.getElementsByName("x");
    cleanFormData(xCheckboxes);

    errorMsg.textContent = "";

    let tmpR = document.querySelector(".r-button:disabled");

    if(!validateRSelection(tmpR)){
        return;
    }

    let r = tmpR.value;

    let params = formData(0, 0, r);
    let tmpResponse = [];

    fetch(`controllerServlet?${params}`, {
        method: "GET"
    }).then(response => {
        if (!response.ok) {
            throw new Error("unlucky");
        }
        console.log(response);
        return response.text();
    })
        .then(data => {
            response.textContent = data;
            tmpResponse = data.split(';');
            let xs = tmpResponse[0].split(',');
            console.log(xs,tmpResponse[1], tmpResponse[2])
            drawGraph(tmpResponse[2]);
        })
        .catch(error => {
            console.log("unlucky");
        });
})

canvas.addEventListener("click", function (e){
    e.preventDefault();

    let xC = (e.clientX - canvas.getBoundingClientRect().left - 200) / 30;
    console.log(xC);
    let yC = -(e.clientY - canvas.getBoundingClientRect().top - 200) / 30;
    console.log(yC);
    let tmpR = document.querySelector(".r-button:disabled");

    if(tmpR === null){
        errorMsg.textContent = "U need to select the radius";
        return;
    }
    const r = tmpR.value;

    drawDots([xC], yC, r);
});

yInput.addEventListener("input", function () {
    let tmpY = yInput.value;
    tmpY = tmpY.replace(",", ".")

    if(isValidY(tmpY)){
        yError.style.visibility =  "hidden";
        yMarker = false;
    }
    else{
        yError.style.visibility = "visible";
        yMarker = true;
    }
});



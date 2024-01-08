const errorMsg = document.getElementById("error-message");
const response = document.getElementById("response");
const submitButton= document.getElementById("submit-button");
const setRButton = document.getElementById("submit-r-button");
const yInput=document.getElementById("y-input-field");
const yError = document.getElementById("y-error");
const R = document.querySelectorAll('.r-button');
const time = document.getElementById("time");
const executionTime = document.getElementById("execution-time");
const history = document.getElementById("history");
const hitting = document.getElementById("hitting");
const sR = document.getElementById("R-storage")

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
    sR.textContent = tmpR.value;
    console.log(sR.textContent)

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
    console.log(typeof y, typeof r)
    let params = formData(selectedXValues, y, r);
    let tmpResponse = [];

    fetch(`controllerServlet?${params}`, {
        method: "GET"
    }).then(response => {
        if (!response.ok) {
            throw new Error("unlucky");
        }
        return response.text();
    })
        .then(data => {
            // response.textContent = data;
            tmpResponse = data.split(';');
            let xs = tmpResponse[0].split(',');
            drawGraph(tmpResponse[2]);
            drawDots(xs,tmpResponse[1], tmpResponse[2]);
            controlHistory(tmpResponse);
        })
        .catch(error => {
            console.log("unlucky");
        });

    //cleanFormData(xCheckboxes);
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

    sR.textContent = tmpR.value;
    drawGraph(sR.textContent);
})

canvas.addEventListener("click", function (e) {
    e.preventDefault();


    if(sR.textContent === ""){
        errorMsg.textContent = "U need to select the radius";
        return;
    }

    let xC = String((e.clientX - canvas.getBoundingClientRect().left - 200) / 30);
    console.log(typeof xC, xC);
    let yC = String(-(e.clientY - canvas.getBoundingClientRect().top - 200) / 30);
    console.log(typeof yC, yC);
    drawDots([xC], yC, sR.textContent);
    let params = formData(xC, yC, sR.textContent);
    let tmpResponse = [];

    fetch(`controllerServlet?${params}`, {
        method: "GET"
    }).then(response => {
        if (!response.ok) {
            throw new Error("unlucky");
        }
        return response.text();
    })
        .then(data => {
            console.log(data);
            tmpResponse = data.split(';');
            controlHistory(tmpResponse);
        })
        .catch(error => {
            console.log("unlucky");
        });

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







function controlHistory(tmpResponse){
    let x = tmpResponse[0].split(',');
    let exTime = tmpResponse[4].split(',');
    let hit = tmpResponse[3].split(',');

    for(let i = 0; i < x.length; i++){
        const historyEl = document.createElement("div");
        const timeEl = document.createElement("div");
        const exTimeEl = document.createElement("div");
        const hittingEl = document.createElement("div");


        historyEl.textContent = "x:"+x[i]+" y:"+tmpResponse[1]+" r:"+tmpResponse[2];
        exTimeEl.textContent = exTime[i];
        timeEl.textContent = tmpResponse[5];
        hittingEl.textContent = hit[i];
        hitting.insertBefore(hittingEl, hitting.firstChild);
        history.insertBefore(historyEl, history.firstChild);
        time.insertBefore(timeEl, time.firstChild);
        executionTime.insertBefore(exTimeEl, executionTime.firstChild)
    }

}

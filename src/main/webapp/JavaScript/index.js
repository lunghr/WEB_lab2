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
const sR = document.getElementById("R-storage");
let lastRequestHistory = document.getElementById("history-storage");

let yMarker = true;

let lastRequest = [];
let tableData = [];

const TABLE_SAVE_LOCATION = "lab_1_table_data";

const saveField = (name, value) => {
    localStorage.setItem(name, value);
}
function saveTable (){
    saveField(TABLE_SAVE_LOCATION, btoa(JSON.stringify(tableData)))
}
const getField = name => {
    return localStorage.getItem(name)
}

const restoreTable = () => {

    console.log("restore table data")
    const rawTableData = getField(TABLE_SAVE_LOCATION)
    if (!rawTableData) {
        return
    }

    console.log("ops")
    const data = JSON.parse(atob(rawTableData))
    tableData = data
    console.log(tableData);
    data.forEach(it => controlHistory(it))
}

const showHit = () => {
    fetch("data-servlet")
        .then(response => response.text())
        .then(data => {
            let responseData = data.split(';');
            console.log("showHit:" + data);

            tableData.push(responseData);
            saveTable();
            controlHistory(responseData);
        })
        .catch(() =>{})
}

const saveData = data => {
    console.log("save data: " + data);
    fetch('data-servlet', {
        method: 'post',
        headers: {
            'Content-Type': 'text/plain'
        },
        body:data
    })
        .then(response => response.text())
        .then(body => {
            console.log(body)
        })
}

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
    restoreTable();

}

submitButton.addEventListener("click", function (e) {
    e.preventDefault();

    lastRequestHistory.textContent = '';
    localStorage.removeItem("last");


    const y = document.getElementById("y-input-field").value.replace(",", ".");
    let tmpR = document.querySelector(".r-button:disabled");

    if(!validateRSelection(tmpR)){
        return;
    }
    let r = tmpR.value;
    sR.textContent = tmpR.value;

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
    fetch(`checkServlet?${params}`, {
        method: "GET"
    })
        .then(response => response.text())
        .then(data =>{
            let tmpString = lastRequestHistory.textContent;
            tmpString = data + " " + tmpString;
            lastRequestHistory.textContent = tmpString;
            localStorage.setItem('last', lastRequestHistory.textContent);
            console.log("checkServlet response data:" + data);
            let tmp = data.split(';');
            saveData(data);
            showHit();
            let xs = tmp[0].split(',');
            drawGraph(tmp[2]);
            drawDots(xs,tmp[1], tmp[2]);
        })





    //cleanFormData(xCheckboxes);
});

setRButton.addEventListener("click", function (e){
    e.preventDefault();
    lastRequestHistory.textContent = "";

    localStorage.removeItem("last");

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
const truncateString = (s, w) => s.length > w ? s.slice(0, w) + "..." : s;
canvas.addEventListener("click", function (e) {
    e.preventDefault();


    if(sR.textContent === ""){
        errorMsg.textContent = "U need to select the radius";
        return;
    }

    let xC = String(((e.clientX - canvas.getBoundingClientRect().left - 200) / 30));
    if (xC.length > 7){
        xC = xC.slice(0, 7);
    }
    let yC = String(-(e.clientY - canvas.getBoundingClientRect().top - 200) / 30);
    console.log(typeof yC, yC);
    if (yC.length > 7){
        yC = yC.slice(0, 7);
    }

    drawDots([xC], yC, sR.textContent);
    let params = formData(xC, yC, sR.textContent);

    fetch(`checkServlet?${params}`, {
        method: "GET"
    })
        .then(response => response.text())
        .then(data =>{
            console.log("checkServlet response data:" + data);
            let tmp = data.split(';');
            saveData(data);
            showHit();
            let tmpString = lastRequestHistory.textContent;
            tmpString = data + " " + tmpString;
            lastRequestHistory.textContent = tmpString;
            localStorage.setItem('last', lastRequestHistory.textContent);
        })

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

    if (tmpResponse.length === 0){
        return;
    }

    if(tmpResponse[0] === "No data available"){
        return;
    }
    console.log("controlHistory: " + tmpResponse);
    let x = tmpResponse[0].split(',');

    console.log(x);
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

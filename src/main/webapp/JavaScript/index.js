
const R = document.querySelectorAll('.r-button');
const response = document.getElementById("response");
const form = document.getElementById("user-input")
const graph = document.getElementById("canvas")
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

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const y = document.getElementById("y-input-field").value.replace(",", ".");
    const r = document.querySelector(".r-button:disabled").value;
    let xCheckboxes = document.getElementsByName("x");
    let selectedXValues = [];
    for (let i = 0; i < xCheckboxes.length; i++) {
        if (xCheckboxes[i].checked) {
            selectedXValues.push(xCheckboxes[i].value);
        }
    }

    let formData = {
        X: selectedXValues.join(","),
        Y: y,
        R: r
    };
    let params = new URLSearchParams(formData);
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
            console.log(data)
            tmpResponse = data.split(';');
            //console.log(tmpResponse)
            let xs = tmpResponse[0].split(',');
            console.log(xs,tmpResponse[1], tmpResponse[2])
            drawGraph(tmpResponse[2]);
            drawDots(xs,tmpResponse[1], tmpResponse[2]);
        })
        .catch(error => {
            console.log("unlucky");
        });
});

canvas.addEventListener("click", function (e){
    e.preventDefault();
    let xC = (e.clientX - canvas.getBoundingClientRect().left - 200) / 30;
    console.log(xC);
    let yC = -(e.clientY - canvas.getBoundingClientRect().top - 200) / 30;
    console.log(yC);
    const r = document.querySelector(".r-button:disabled").value;
    drawDots([xC], yC, r);
});


function validateFormValues(){

}
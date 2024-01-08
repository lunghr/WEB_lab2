function isValidY(a){
    return  a>= -5 && a <= 3 && !(a.trim()==="") && !isNaN(parseFloat(a));
}

function validateFormValues(x,y,r) {
    return (x.length === 0 || y === '' || r === undefined || yMarker)
}

function formData(x, y, r){
    if (!Array.isArray(x)){
        x = [x];
    }
    let formData = {
        X: x.join(","),
        Y: y,
        R: r
    };
    return new URLSearchParams(formData);
}

function validateRSelection(r){
    if(r === null){
        errorMsg.textContent = "U need to select the radius";
        return false;
    }
    return true;
}

function cleanFormData(xCheckboxes){
    yInput.value = '';
    errorMsg.textContent = '';
    for (let i = 0; i < xCheckboxes.length; i++) {
        if (xCheckboxes[i].checked) {
            xCheckboxes[i].checked = false;
        }
    }
}
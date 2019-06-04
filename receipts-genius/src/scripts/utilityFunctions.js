export function formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
    try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;

        const negativeSign = amount < 0 ? "-" : "";

        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;

        return negativeSign + (j ? i.substr(0, j) + thousands : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
    } catch (e) {
        console.log(e)
    }
};

export function showTrashCan(show, id) {
    if (show) {
        var containerChildren = document.getElementById(id).children;
        var trash = containerChildren[0];
        trash.classList.add("show");
    } else {
        var containerChildren = document.getElementById(id).children;
        var trash = containerChildren[0];
        trash.classList.remove("show");
    }
};

export function amountSetMoney() {
    var amtInput = document.getElementById("amountInput");
    var amt = '$'+formatMoney(amtInput.value);
    amtInput.value = amt;
}

export function setMaxDate(id) {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }

    today = yyyy+'-'+mm+'-'+dd;
    document.getElementById(id).setAttribute("max", today);
}
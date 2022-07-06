let from = document.getElementById("from");
let to = document.getElementById("to");
let calculate = document.getElementById("calc");
let input = document.getElementById("input");
let result = document.getElementById("result");
let historyList = document.getElementById("historyList");
let clearBtn = document.getElementById("clearBtn");

clearBtn.addEventListener('click', function (){
    historyList.deleteRow(0);
    localStorage.removeItem("record");

    if(historyList.innerHTML == ''){
        historyList.innerHTML = `<tr id="rowSpacer"><td colspan="5">There is no record</td></tr>`;
    }
});

function addTo(x,y){
    let op = document.createElement("option");
    let value = document.createTextNode(x);
    op.appendChild(value);
    op.setAttribute("value", `${abNumber(y)}`);

    to.appendChild(op);
}
function addFrom(x,y){
    let op = document.createElement("option");
    let value = document.createTextNode(x);
    op.appendChild(value);
    op.setAttribute("value", `${abNumber(y)}`);

    from.appendChild(op);
}

function abNumber(x){
    return Number(x.replace(',',''));
}
// console.log(data.rates);
for (let i in data.rates){
    addFrom(i,data.rates[i]);

    addTo(i,data.rates[i]);
}

function createTable(x){
    let tr = document.createElement("tr");

    let rowSpacer = document.getElementById("rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    }

    x.forEach(function (el, index){
        let td = document.createElement("td");
        let tdText = document.createTextNode(el);

        td.appendChild(tdText);

        tr.appendChild(td);
        tr.setAttribute("id", index);
    });


    historyList.appendChild(tr);
}


function store(){
    localStorage.setItem("record",historyList.innerHTML);
}


//main
calculate.addEventListener("submit", function (event){
    event.preventDefault();

    //get data
    let x = input.value;
    let y = from.value;
    let z = to.value;
    // console.log(x,y,z);

    // process
    let first = x * y;
    let second = first/z;
    let resultOne = second.toFixed(2);
    // console.log(second.toFixed(2));

    let fromCurrency = x +" " + from.options[from.selectedIndex].innerHTML;
    let toCurrency = to.options[to.selectedIndex].innerHTML;
    let date = new Date();
    let resultUpdate = resultOne +" "+toCurrency;


    let arr = [date.toLocaleString(), fromCurrency, toCurrency, resultUpdate];
    createTable(arr);
    store();



    //set data
    result.innerHTML = resultOne;
    input.value = '';
    input.focus();
    from.value = '';
    to.value = '1';
});

// function show(){
//     historyList.innerHTML = localStorage.getItem("record");
// };
// show();

(function (){
    if(localStorage.getItem("record")){
        historyList.innerHTML =  localStorage.getItem("record");

    }else {
        historyList.innerHTML = `<tr id="rowSpacer"><td colspan="5">There is no record</td></tr>`;
    }
})();


document.getElementById("nightChange").addEventListener('click',function (){
    document.body.classList.toggle("night-mode");
    document.getElementById('changeIcon').classList.toggle("fa-sun");
})

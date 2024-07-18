let token1 = new Token("Bitcoin", "BTC", "2024-07-15", 54200, 100, (100 / 54200));
let token2 = new Token("Etherium", "ETH", "2024-07-16", 3200, 50, (50 / 3200));
let token3 = new Token("Chainlink", "LINK", "2024-07-16", 13, 50, (50 / 13));
let token4 = new Token("Bitcoin", "BTC", "2024-07-18", 55000, 75, (75 / 55000));
let tokens = [token1, token2, token3, token4];

function displayToken(tokens) {
    let sout = "";
    for (let i = 0; i < tokens.length; i++) {
        sout = sout + "<tr>";
        sout = sout + "<th>" + (i + 1) + "</th>"
        sout = sout + "<td>" + tokens[i].name + "</td>";
        sout = sout + "<td>" + tokens[i].symbol + "</td>";
        sout = sout + "<td>" + tokens[i].date + "</td>";
        sout = sout + "<td>" + tokens[i].price + "$" + "</td>";
        sout = sout + "<td>" + tokens[i].cost + "$" + "</td>";
        sout = sout + "<td>" + tokens[i].amount.toFixed(4) + "<br>" + tokens[i].symbol + "</td>";
        sout = sout + "<td>" + "<input type='button' class='btn btn-outline-warning btn-sm' id='edit' onclick='editToken(" + i + ")' value='Edit'>" + "</td>";
        sout = sout + "<td>" + "<input type='button' class='btn btn-outline-danger btn-sm' id='delete' onclick='deleteToken(" + i + ")' value='Delete'>" + "</td>";
        sout = sout + "</tr>";
    }
    document.getElementById("tokensDCAList").innerHTML = sout;
}

displayToken(tokens);

function addNewToken() {
    let newTokenName = document.getElementById("name").value;
    let newTokenSymbol = document.getElementById("symbol").value;
    let newTokenDate = document.getElementById("date").value;
    let newTokenPrice = +document.getElementById("price").value;
    let newTokenCost = +document.getElementById("cost").value;
    let newTokenAmount = newTokenCost / newTokenPrice;
    let newToken = new Token(newTokenName, newTokenSymbol, newTokenDate, newTokenPrice, newTokenCost, newTokenAmount);
    if (newTokenName === "" || newTokenSymbol === "" || newTokenDate === "" || newTokenPrice === 0 || newTokenCost === 0) {
        alert("Please fill full information!");
    } else {
        tokens.push(newToken);
        alert("One transaction added");
    }
    document.getElementById("name").value = "";
    document.getElementById("symbol").value = "";
    document.getElementById("date").value = "";
    document.getElementById("price").value = "";
    document.getElementById("cost").value = "";
    displayToken(tokens);
}

function editToken(i) {
    document.getElementById("name").value = tokens[i].name;
    document.getElementById("symbol").value = tokens[i].symbol;
    document.getElementById("date").value = tokens[i].date;
    document.getElementById("price").value = tokens[i].price;
    document.getElementById("cost").value = tokens[i].cost;
    index = i;
    document.getElementById("addToken").style.display = "none";
    document.getElementById("saveToken").style.display = "inline-block";
}

let index;

function saveToken() {
    let editToken = new Token(document.getElementById("name").value, document.getElementById("symbol").value, document.getElementById("date").value, +document.getElementById("price").value, +document.getElementById("cost").value, +(document.getElementById("cost").value / document.getElementById("price").value));
    tokens.splice(index, 1, editToken);
    alert("You have changed the token number "+(index+1));
    displayToken(tokens);
    document.getElementById("addToken").style.display = "inline-block";
    document.getElementById("saveToken").style.display = "none";
    document.getElementById("name").value = "";
    document.getElementById("symbol").value = "";
    document.getElementById("date").value = "";
    document.getElementById("price").value = "";
    document.getElementById("cost").value = "";
}

function deleteToken(i) {
    let check = confirm("Bạn chắc chắn muốn xóa giao dịch mua " + tokens[i].name + " ở ngày " + tokens[i].date + " phải không?");
    if (check) {
        tokens.splice(i, 1);
    }
    displayToken(tokens);
}

function reduceDuplicates(tokens) {
    let tokenMap = {};
    tokens.forEach(token => {
        let {name, symbol, amount, cost, price} = token;
        let count = 1;
        if (tokenMap[name]) {
            count++;
            tokenMap[name].cost += cost;
            tokenMap[name].price += price;
            tokenMap[name].amount += amount;
            tokenMap[name].price = tokenMap[name].price / count;
        } else {
            tokenMap[name] = {name, symbol, amount, cost, price};
            tokenMap[name].amount = (tokenMap[name].cost / tokenMap[name].price);
        }
    });
    return Object.values(tokenMap);
}


function updateAssetList() {
    let assetTokens = reduceDuplicates(tokens);
    let sout = "";
    for (let i = 0; i < assetTokens.length; i++) {
        sout = sout + "<tr>";
        sout = sout + "<th>" + (i + 1) + "</th>"
        sout = sout + "<td>" + assetTokens[i].name + "</td>";
        sout = sout + "<td>" + assetTokens[i].symbol + "</td>";
        sout = sout + "<td>" + +assetTokens[i].amount.toFixed(4) + "<br>" + assetTokens[i].symbol + "</td>";
        sout = sout + "<td>" + +assetTokens[i].cost + "$" + "</td>";
        sout = sout + "<td>" + +assetTokens[i].price + "$ / 1 " + assetTokens[i].symbol + "</td>";
        sout = sout + "<td>" + "</td>";
        sout = sout + "</tr>";
    }
    document.getElementById("assetList").innerHTML = sout;
    let count = 0;
    for (let i = 0; i < tokens.length; i++) {
        if (tokens[i].cost) {
            count += tokens[i].cost;
        }
        document.getElementById("total").innerHTML = "Total : " + count + "$";
    }
}
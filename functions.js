var Block = "block";
var None = "none";

function ToggleElement(id, style) {
    console.log(`Toggle : ${id} : ${style}`);
    var divElement = document.getElementById(id);
    divElement.style.display = style;
}

function ShowElement(id) {
    var ids = [
        "content_legendaries",
        "content_junk_all",
        "content_junk_single"
    ];
    for (i = 0; i < ids.length; i++) {
        var style = None;
        if (id === ids[i]) {
            style = Block;
        }
        ToggleElement(ids[i], style);
    }
}

function ShowContentLegendaries() {
    ShowElement("content_legendaries");
}

function GetJunkItem(index, items, amount = 0) {
    let item = items[index];
    let sell = amount - item.Keep;
    if (sell < 0) {
        sell = 0;
    }
    let bulkPrice = item.Sell * item.Bulk;
    return { "Item": item.Item, "Keep": item.Keep, "SellQuantity": sell, "SellPrice": item.Sell, "BulkQuantity": item.Bulk, "BulkPrice": bulkPrice };
}

function ShowContentJunk(type) {
    ShowElement("content_junk");
    ToggleElement("content_junk_all", None);
    ToggleElement("content_junk_single", None);
    if (type === null || type === "") {
        return;
    }
    var id = `content_junk_${type}`;
    ToggleElement(id, Block);
    let data = GetJunkData();
    var selectElement = document.getElementById("junk_items_select");
    while (selectElement.options.length > 0) {
        selectElement.remove(0); // Remove the first option (index 0) repeatedly
    }
    var table = document.getElementById("allJunkTable_Body");
    for (i = 0; i < data.length; i++) {
        let item = GetJunkItem(i, data);
        var newOption = document.createElement("option");
        // Set the value and text of the new option
        newOption.value = i;
        newOption.text = item.Item;
        // Append the new option to the select element
        selectElement.appendChild(newOption);
        
        var row = table.insertRow(i);
        var cells = [ item.Item, item.Keep, item.SellPrice, item.BulkQuantity, item.BulkPrice ];
        for (c = 0; c < cells.length; c++)
        {
            var cell1 = row.insertCell(c);
            cell1.innerHTML = cells[c];
        }
    }
}
function ClearJunkAmount()
{
    document.getElementById("junk_amount").value = "";
}
function ShowJunkItemData() {
    var amount = document.getElementById("junk_amount").value;
    if (amount === "") {
        amount = 0;
    }
    var selectElement = document.getElementById("junk_items_select");
    // Get the selected option
    var selectedOption = selectElement.options[selectElement.selectedIndex];
    // Get the text of the selected option
    var selectedOptionText = selectedOption.text;
    let data = GetJunkData();
    var divElement = null;
    for (i = 0; i < data.length; i++) {
        let item = GetJunkItem(i, data);
        if (item.Item === selectedOptionText) {
            let sell = amount - item.Keep;
            if (sell < 0) {
                sell = 0;
            }
            divElement = document.getElementById("junk_item_data");
            document.getElementById("item.name").value = item.Item;
            document.getElementById("item.amount").value = amount;
            document.getElementById("item.Keep").value = item.Keep;
            document.getElementById("item.sell").value = sell;
            document.getElementById("item.SellPrice").value = item.SellPrice;
            document.getElementById("item.BulkQuantity").value = item.BulkQuantity;
            document.getElementById("item.BulkPrice").value = item.BulkPrice;
            // Update the content of the div
            /*
            let table = "<table>";
            table += `<tr><td><b>Item</b></td><td>${item.Item}</td></tr>`;
            table += `<tr><td><b>Stored</b></td><td>${amount}</td></tr>`;
            table += `<tr><td><b>Keep</b></td><td>${item.Keep}</td></tr>`;
            table += `<tr><td><b>Sell</b></td><td>${sell}</td></tr>`;
            table += `<tr><td><b>Price</b></td><td>${item.SellPrice}</td></tr>`;
            table += `<tr><td><b>Bulk</b></td><td>${item.BulkQuantity}</td></tr>`;
            table += `<tr><td><b>Bulk Price</b></td><td>${item.BulkPrice}</td></tr>`;
            table += "</table>";
            divElement.innerHTML = "<hr>" + table;
            */
        }
    }
}
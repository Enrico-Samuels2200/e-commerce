/*Task 15
  Capstone 2 (part: 5/6)
*/

$(document).ready(function() {
    $("#imgCon").fadeIn(5000);
    $("#infoCon").slideDown(5000);
});

function Item(name, price, image, id, count) { //Constructor creates objects containg product details.
    this.name = name;
    this.price = price;
    this.image = image;
    this.id = id;
    this.count = count;
};

var item1 = new Item("Raspberry pi zero w-dev-14277", "220.00", "images/1.jpg", "0", "1");
var item2 = new Item("Raspberry-pi 3 model B", "550.00", "images/2.jpg", "1", "1");
var item3 = new Item("Mavic 2 Zoom Fly Pro", "10100.00", "images/3.jpg", "2", "1");
var item4 = new Item("Raspberry pi powered desktop", "1230.00", "images/4.jpg", "3", "1");
var item5 = new Item("Huawei P30 pro", "6499.00", "images/5.jpg", "4", "1");
var item6 = new Item("Alienware M17x", "23499.00", "images/6.png", "5", "1");

let stock = [item1, item2, item3, item4, item5, item6]; //Creates array of objects.
var conS = JSON.stringify(stock); //"Converts stock into a string and save it in a var "conS"(convertString).
let a = localStorage.setItem("cart", conS) //Saves conS into an object with key "cart" on the local storage.

var total = 0;
var keepList = []; //Creates empty array;


function run() {
    let obj = JSON.parse(localStorage.getItem("cart")); //Retrieves the objects from cart.

    //Retrieves the id's of the buttons clicked on.
    function id(locate) {
        locate = locate || window.event;
        locate = locate.target || locate.srcElement;
        var index = locate.id; //Saves the id in a var called index.
        return index; //Returns the var index once the function ends.
    };

    //Calculates the total amount.
    function cal() {
        total += parseInt(obj[id()].price);
    };
    cal();

    //Checks for array of indexes if none then it creates. If array exist it adds on to it.
    if (localStorage.getItem("productIndex") === null) { //If there is no "productIndex" one will be created.
        localStorage.setItem("productIndex", JSON.stringify(keepList));
    }
    let getVal = JSON.parse(localStorage.getItem("productIndex")); //If productIndex is found it will keep appending items to "keepList".
    keepList = getVal;
    keepList.push(parseInt(id())); //Adds items to "keepList".
    localStorage.setItem("productIndex", JSON.stringify(keepList)); //Turns the "keepList" into a string on the local storage.




    //Total!
    let newTotal = localStorage.getItem("Total"); //Retrieves the object "Total" from local storage.
    if (newTotal > 0) { //Checks if "Total" is greater than 0.
        total += parseInt(newTotal); //If it has values greater than 0 it retrieve its old value and add the new values to it.
        let storeTotal = localStorage.setItem("Total", total);
    } else {
        let storeTotal = localStorage.setItem("Total", total); //If there is no value it adds 0 to the local storage "Total".
    }
    alert("Total cost: R" + total); //User recieves the total cost of items they have in their cart.
};


//Adds new row of elements.
let readPL = JSON.parse(localStorage.getItem("productIndex")); //"readPL"(read product list).
readPL.forEach(function(item) { //Reads all the Items id's of which acts as an index.
    $(document).ready(function() {
        let obj = JSON.parse(localStorage.getItem("cart")); //Converts "cart" back to an object.
        $("#here").append("<div class='thumb'>" + "<img src=" + obj[item].image + ">" + "<p>" + obj[item].name + "</p>" + "<p>R" + obj[item].price + "</p>" + "</div><br/>"); //For every item it'll create a new row of elements in the html page.
    });
});


//Displays total amount in html.
$(document).ready(function() {
    let amount = JSON.parse(localStorage.getItem("Total"));
    let totalAmount = amount + amount * 0.15 //Adds VAT to the total amount the user has to pay.
    $("#readA").val("R" + totalAmount.toFixed(2))
});

//Clears the localStorage for productIndex.
$(document).ready(function() {
    $("#delB").click(function() {
        localStorage.removeItem("productIndex") //Removes "productIndex" from local storage.
        localStorage.removeItem("Total") //Removes "Total" from local storage.
        location.reload(); //Reloads the page so function can take effect.
    });
});

//Hides coupon form on load and displays when button is pressed.
$(document).ready(function() {
    $("#couponWindow").hide();

    $("#couponBtn").click(function() {
        $("#couponWindow").show();
    });
    $("#couponClose").click(function() {
        $("#couponWindow").hide()
    });
});

//Calculates and subtracts a certain % from total cost when coupon is applied.
function coupon() {
    getTotal = localStorage.getItem("Total");
    discount = getTotal * 0.25; //Calculates 25% of The total amount.
    total = getTotal - discount; //Subtracts the discount from the total amount.
    localStorage.setItem("Total", total) //Adds "total" to object "Total" in local storage.

    //Claim coupon button.
    $("document").ready(function() {
        $("#couponWindow").hide(); //Once the user claims the coupon the form disapears.
    });
    alert("Your total cost is now: R" + total.toFixed(2)) //The user recieves their total amount with the discount applied.
};

//Creates a list of delivery options. 
var dList = ["", "vehicle", "drone", "mail"];
dList.forEach(function(opt) { //'opt' option
    const createOpt = document.createElement("option");
    createOpt.innerHTML = opt;
    document.getElementById("deliveryChoice").appendChild(createOpt);
});

//Hides delivery options. 
$("#displayDelivery").click(function() {
    $("#deliveryMenu").slideToggle(2000);
});

//Prices of different delivery methods.
var total = parseInt(localStorage.getItem("Total"));

$("document").ready(function() {
    $("#deliveryChoice").change(function() {
        var dMethod = $(this).children("option:selected").val(); //Retrieves the value of "#deliveryChoice".

        //Different prices will be applied depending on what "#deliveryChoice" value is.
        if (dMethod === "drone") {
            total += 150;
        } else if (dMethod === "vehicle") {
            total += 250;
        } else if (dMethod === "mail") {
            total += 50;
        }
        localStorage.setItem("Total", total)
        $("#deliveryChoice").css("readonly", true); //Creates a var that displays the users total amount in the cart page with out the user being able to edit it.
    });
});

//Generates random refernce number.
$("document").ready(function() {
    $("#sendOrderBtn").click(function() {
        var random = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5); //Generates random string of containg numbers and characters.
        alert("Your order has been confirmed. Thank you for shopping at the online store." + "<br/+>Your order number is: " + random) //Gives the user their product reference number.
    });
});
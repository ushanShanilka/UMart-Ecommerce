var ProductImg =document.getElementById("ProductImg");
var SmallImg = document.getElementsByClassName("small-img");
var ProductHomeImg = document.getElementsByClassName("ProductHomeImg");
var ProductBuyImg = document.getElementById("ProductBuyImg");

SmallImg[0].onclick = function () {
    ProductImg.src = SmallImg[0].src;
}
SmallImg[1].onclick = function () {
    ProductImg.src = SmallImg[1].src;
}
SmallImg[2].onclick = function () {
    ProductImg.src = SmallImg[2].src;
}
ProductHomeImg[0].onclick = function () {
    ProductImg.src = ProductHomeImg[0].src;
    $('#ProductDetailsName').text($('#Name1').text());
    $('#ProductDetailsPrice').text($('#price1').text());
}
ProductHomeImg[1].onclick = function () {
    ProductImg.src = ProductHomeImg[1].src;
    SmallImg[0].src = 'assets\\images\\gallery-2.1.jpg'
    SmallImg[1].src =  ProductHomeImg[1].src;
    SmallImg[2].src = 'assets\\images\\gallery-2.3.jpg'
    $('#ProductDetailsName').text($('#Name2').text());
    $('#ProductDetailsPrice').text($('#price2').text());
}
ProductHomeImg[2].onclick = function () {
    ProductImg.src = ProductHomeImg[2].src;
    SmallImg[0].src = ProductHomeImg[2].src;
    SmallImg[1].src = 'assets\\images\\gallery-3.1.jpg'
    SmallImg[2].src = 'assets\\images\\gallery-3.2.jpg'
    $('#ProductDetailsName').text($('#Name3').text());
    $('#ProductDetailsPrice').text($('#price3').text());
}
ProductHomeImg[3].onclick = function () {
    ProductImg.src = ProductHomeImg[3].src;
    SmallImg[0].src = ProductHomeImg[3].src;
    SmallImg[1].src = 'assets\\images\\gallery-4.1.jpg'
    SmallImg[2].src = 'assets\\images\\gallery-4.2.jpg'
    $('#ProductDetailsName').text($('#Name4').text());
    $('#ProductDetailsPrice').text($('#price4').text());
}

/*--------------------------------------------------------------------*/


var Model = document.getElementById("model");

var ModelClose = document.getElementById("model-close");

function ModelVisible () {
    Model.style.visibility= 'visible';
    Model.style.opacity= '1';
}

ModelClose.addEventListener('click',function () {
    Model.style.visibility= 'hidden';
    Model.style.opacity= '0';
});

$('#btnAddCart').click(function () {
    ModelVisible();
    $('#btnSingIn').click(function () {
        let tempUserName = $('#tempUserName').val();
        let tempPassword = $('#tempPassword').val();

        $.ajax({
            method: 'GET',
            url: `http://localhost:8080/api/v1/customer/${tempUserName}/${tempPassword}`,

            success:function (response) {
                let resp = response.data;
                clearText();
                if (resp.password===tempPassword){

                    saveCartItem();
                    loadAllCartByCustomerUserName();
                    Home.style.display='none';
                    Cart.style.display='none';
                    Product.style.display='none';
                    Account.style.display='none';
                    ProductDetails.style.display='none';
                    Cart.style.display='block';
                    ProductDetails.style.display='none';
                    CustomerProfile.style.display = 'none';
                }else {
                    console.log("Error")
                }
            },
            error:function () {
                alert("Incorrect!");
                console.log("Error")
            }
        });
    });
});

function numberGenerate () {
    $.ajax({
        method:'GET',
        url:'http://localhost:8080/api/v1/cart',

        success:function (response) {
            let resp = response.data;
            console.log(resp[resp.length-1].number)
                if (resp[resp.length-1].number===null){
                }else {
                    let lastNumber = resp[resp.length-1].number;
                    let number =$('#saveCartNumber').text("C00"+(parseInt(lastNumber.split('C00')[ 1 ]) + 1));
                    console.log("Last Number : "+ number.text());
                }
        }
    })
}

numberGenerate();

function saveCartItem () {

    $('#tblCart').empty();

    let cartNumber = $('#saveCartNumber').text();
    let tempUserName = $('#tempUserName').val();
    let imgSrc = ProductImg.src;
    let productDetailsName = $('#ProductDetailsName').text();
    let productDetailsPrice = $('#ProductDetailsPrice').text();
    let size = $('#selectSize').val();
    let qty = $('#cartQty').val();
        let number = parseInt(productDetailsPrice.split('$')[ 1 ] * qty);
        let tempTax = number / 100*10;
        let tempTot = number+tempTax;
    console.log(tempTot)
    let tax = "$"+tempTax+".00";
    let subtotal = "$"+tempTot+".00"


    $.ajax({
        method:'POST',
        url:`http://localhost:8080/api/v1/cart`,
        contentType:'application/json',
        async:true,
        data:JSON.stringify({
            number:cartNumber,
            imgScr:imgSrc,
            productName:productDetailsName,
            qty:qty,
            tax:tax,
            size:size,
            subTotal:subtotal,
            unitPrice:productDetailsPrice,
            user_NAME:{userName:tempUserName}
        }),
        success:function (response) {
            loadAllCartByCustomerUserName();
            //generateTotal();
            console.log(response)
            numberGenerate();
        }
    })
}

function loadAllCartByCustomerUserName () {
    console.log("Load")
    let tempUserName = $('#tempUserName').val();

    $.ajax({
        method: 'GET',
        url: `http://localhost:8080/api/v1/cart/${tempUserName}`,

        success:function (response) {
            $('#tblCart').empty();
            let resp = response.data;

            for (var i in resp ){
                let number = (resp[i].number);
                let imgScr = (resp[i].imgScr);
                let productName = (resp[i].productName);
                let qty = (resp[i].qty);
                let subTotal = (resp[i].subTotal);
                let unitPrice = (resp[i].unitPrice);
                let size = (resp[i].size);
                let tax = (resp[i].tax);
                let userName = (resp[i].userName);

                let row = `<tr>
                    <td>
                        <div class="cart-info">
                        <input id="checkBox" value="true" class="checkBox" type="checkbox" style=" width: 21px;margin-top: 23px;margin-right: 13px;">
                            <img class="orderImg" src="${imgScr}" width="200px" height="200px">
                            <div>
                                <p id="ProductBuyName">${productName}</p>
                                <small id="ProductBuyPrice">${unitPrice}</small>
                                <br>
                                <a class="removeBtn" id="RemoveProduct" >Remove</a>
                            </div>
                        </div>
                    </td>
                    <td id="cartNumber">${number}</td>
                    <td id="buySelectSize">${size}</td>
                    <td id="tblBuyQty">${qty}</td>
                    <td id="tblTax">${tax}</tdid>
                    <td id="subtotal">${subTotal} <br><a class="btn tblBuyNow" id="btnByNow" >Buy Now</a></td>
                </tr>`

                $('#tblCart').append(row);
            }
        }
    });
}


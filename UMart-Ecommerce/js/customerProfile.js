var LoginForm = document.getElementById("loginForm");
var RegForm = document.getElementById("regForm");
var AdminForm = document.getElementById("adminForm");
var Indicator = document.getElementById("indicator");

function register () {
    RegForm.style.transform = "translateX(0px)";
    LoginForm.style.transform = "translateX(0px)";
    Indicator.style.transform = "translateX(100px)";
    AdminForm.style.transform = "translateX(0px)";
}

function login () {
    RegForm.style.transform = "translateX(300px)";
    LoginForm.style.transform = "translateX(300px)";
    Indicator.style.transform = "translateX(0px)";
    AdminForm.style.transform = "translateX(300px)";
}

function admin () {
    RegForm.style.transform = "translateX(-300px)";
    LoginForm.style.transform = "translateX(-300px)";
    AdminForm.style.transform = "translateX(-300px)";
    Indicator.style.transform = "translateX(200px)";
}

/*-----------------------------------------------------*/

var MyOrder =document.getElementById("myOrder");
MyOrder.style.display='block';

var CustomerAccount =document.getElementById("account");
CustomerAccount.style.display='none';

let ToBeShipped = document.getElementById("toBeShipped");
ToBeShipped.style.display='none';

let Shipped = document.getElementById("shipped");
Shipped.style.display='none';

let OnShipped = document.getElementById("onShipping");
OnShipped.style.display='none';

$('#btnMyAccount').click(function () {
    MyOrder.style.display='none';
    CustomerAccount.style.display='block';
    OnShipped.style.display='none';
    Shipped.style.display='none';
    ToBeShipped.style.display='none';
});

$('#btnMyOrder').click(function () {
    MyOrder.style.display='block';
    CustomerAccount.style.display='none';
    OnShipped.style.display='none';
    Shipped.style.display='none';
    ToBeShipped.style.display='none';
    getAllCompleteOrder();
});

$('#btnToBeShipped').click(function () {
    MyOrder.style.display='none';
    CustomerAccount.style.display='none';
    OnShipped.style.display='none';
    ToBeShipped.style.display='block';
    Shipped.style.display='none';
    getAllToBeShippedOrder();
});

$('#btnOnShipped').click(function () {
    MyOrder.style.display='none';
    CustomerAccount.style.display='none';
    OnShipped.style.display='none';
    ToBeShipped.style.display='none';
    Shipped.style.display='block';
    getAllShippedOrder();
});

function getAllCompleteOrder(){
    $('#tblCompleteOrder').empty();
    let tempUserName = $('#userName').val();

    $.ajax({
        method:'GET',
        url:`http://localhost:8080/api/v1/placeOrder/${tempUserName}/ShippedComplete`,

        success:function (response) {
            let resp =response.data
            for (var i in resp ){
                let imgSrc = (resp[i].placeOrderImg)
                let orderID = (resp[i].orderID)
                let unitPrice = (resp[ i ].buyProductPrice)
                let buyProductQty= (resp[ i ].buyProductQty)
                let buyProductName = (resp[i].buyProductName)
                let shippingDate = (resp[i].shippingDate)
                let trackingNumber = (resp[i].trackingNumber)
                let shippingStatus = (resp[i].shippingStatus)
                let submitDate = (resp[i].submitDate)

                // console.log(imgSrc)
                // console.log(shippingDate)
                // console.log(trackingNumber)
                // console.log(shippingStatus)

                let row = `<tr><td>
                         <div class="cart-info">
                           <img class="orderImg" src="${imgSrc}" width="200px" height="200px">
                             <div>
                               <p id="ProductBuyName">${buyProductName}</p>
                                  <small id="ProductBuyPrice">${unitPrice}</small> <br>
                                <small id="ProductBuyPrice">qty ${buyProductQty}</small>
                             </div>
                         </div>
                      </td>
                        <td>${orderID}</td>
                        <td>${shippingDate}</td>
                        <td>${trackingNumber}</td>
                        <td>${submitDate}</td>
                        <td>${shippingStatus}</td>
                        </tr>`

                $('#tblCompleteOrder').append(row);
            }
        }
    })
}

function getAllToBeShippedOrder(){
    $('#tblToBeShipped').empty();
    let tempUserName = $('#userName').val();

    $.ajax({
        method:'GET',
        url:`http://localhost:8080/api/v1/placeOrder/${tempUserName}/Processing`,

        success:function (response) {
            let resp = response.data
            console.log(resp)
            for (var i in resp ) {
                let imgSrc = (resp[ i ].placeOrderImg)
                let buyProductName = (resp[ i ].buyProductName)
                let unitPrice = (resp[ i ].buyProductPrice)
                let buyProductQty= (resp[ i ].buyProductQty)
                let orderID = (resp[ i ].orderID)
                let orderDate = (resp[ i ].orderDate)
                let shippingStatus = (resp[ i ].shippingStatus)

                let row = `<tr>
                      <td>
                         <div class="cart-info">
                           <img class="orderImg" src="${imgSrc}" width="200px" height="200px">
                             <div>
                               <p id="ProductBuyName">${buyProductName}</p>
                                  <small id="ProductBuyPrice">${unitPrice}</small> <br>
                                <small id="ProductBuyPrice">qty ${buyProductQty}</small>
                             </div>
                         </div>
                      </td>              
                    <td>${orderID}</td>
                    <td>${orderDate}</td>
                    <td>${shippingStatus}</td>
                    <td> <button id="btnCancelOrder" class="btn tblCancelOrder">Cancel order</button> </td>
                    </tr>`

                $('#tblToBeShipped').append(row);


            }
        }
    })
}

function getAllShippedOrder(){
    $('#tblShipped').empty();
    let tempUserName = $('#userName').val();
    $.ajax({
        method:'GET',
        url:`http://localhost:8080/api/v1/placeOrder/${tempUserName}/OnShipped`,

        success:function (response) {
            let resp = response.data;

            for (var i in resp ) {
                let imgSrc = (resp[ i ].placeOrderImg)
                let buyProductName = (resp[ i ].buyProductName)
                let unitPrice = (resp[ i ].buyProductPrice)
                let buyProductQty= (resp[ i ].buyProductQty)
                let orderID = (resp[ i ].orderID)
                let orderDate = (resp[ i ].orderDate)
                let shippingStatus = (resp[ i ].shippingStatus)
                let shippingDate = (resp[ i ].shippingDate)
                let trackingNumber = (resp[ i ].trackingNumber)
                let estimatedDeliveryDate = (resp[ i ].estimatedDeliveryDate)

                let row = `<tr>
                      <td>
                         <div class="cart-info">
                           <img class="orderImg" src="${imgSrc}" width="200px" height="200px">
                             <div>
                               <p id="ProductBuyName">${buyProductName}</p>
                                  <small id="ProductBuyPrice">${unitPrice}</small> <br>
                                <small id="ProductBuyPrice">qty ${buyProductQty}</small>
                             </div>
                         </div>
                      </td>              
                    <td>${orderID}</td>
                    <td>${shippingDate}</td>
                    <td>${trackingNumber}</td>
                    <td>${estimatedDeliveryDate}</td>
                    <td> <button id="btnConfirmOrder" class="btn tblConfirmOrder">Confirm Order</button> </td>
                    </tr>`

                $('#tblShipped').append(row);
            }

        }
    })
}

$('.table tbody').on('click' , '.tblConfirmOrder' , function () {
    $('#tblShipped>tr').click(function () {
        let a = $(this).children('td:eq(0)').text();
        let orderId = $(this).children('td:eq(1)').text();


        console.log(orderId);
        $.ajax({
            method: 'GET',
            url: `http://localhost:8080/api/v1/placeOrder/${orderId}`,

            success:function (response) {
                let resp = response.data
                console.log(resp)

                let accountOwnerName = resp.accountOwnerName
                let buyProductName = resp.buyProductName
                let buyProductPrice = resp.buyProductPrice
                let buyProductQty= resp.buyProductQty
                let buyProductTotalPrice = resp.buyProductTotalPrice
                let cusCardCvv = resp.cusCardCvv
                let cusCardExpDate = resp.cusCardExpDate
                let cusCardHolderName = resp.cusCardHolderName
                let cusCountry = resp.cusCountry
                let cusCreditCardNumber = resp.cusCreditCardNumber
                let cusName = resp.cusName
                let cusPhoneNumber = resp.cusPhoneNumber
                let cusStreet = resp.cusStreet
                let cusZipCode = resp.cusZipCode
                let estimatedDeliveryDate = resp.estimatedDeliveryDate
                let orderDate = resp.orderDate
                let orderID = resp.orderID
                let placeOrderImg = resp.placeOrderImg
                let shippingDate = resp.shippingDate
                let shippingStatus = resp.shippingStatus
                let trackingNumber = resp.trackingNumber

                let month = new Date().getMonth();
                let toDay = new Date().getDate();
                let year = new Date().getFullYear();

                let date = month+"/"+toDay+"/"+year

                let b = confirm("Are you Sure ?");
                if (b){
                    $.ajax({
                        method:'PUT',
                        url:`http://localhost:8080/api/v1/placeOrder/`,
                        contentType:'application/json',
                        async:true,
                        data:JSON.stringify({
                            orderID:orderID,
                            orderDate:orderDate,
                            accountOwnerName:accountOwnerName,
                            cusName:cusName,
                            cusPhoneNumber:cusPhoneNumber,
                            cusStreet:cusStreet,
                            cusCountry:cusCountry,
                            cusZipCode:cusZipCode,
                            cusCreditCardNumber:cusCreditCardNumber,
                            cusCardHolderName:cusCardHolderName,
                            cusCardExpDate:cusCardExpDate,
                            cusCardCvv:cusCardCvv,
                            placeOrderImg:placeOrderImg,
                            buyProductName:buyProductName,
                            buyProductPrice:buyProductPrice,
                            buyProductQty:buyProductQty,
                            buyProductTotalPrice:buyProductTotalPrice,
                            shippingStatus:"ShippedComplete",
                            shippingDate:shippingDate,
                            trackingNumber:trackingNumber,
                            estimatedDeliveryDate:estimatedDeliveryDate,
                            submitDate:date
                        }),
                        success:function (response) {
                            getAllShippedOrder();
                        }
                    })
                }else {
                    console.log("Close")
                }
            }
        })

    })
})

function confirmOrder () {
    $.ajax({
        method:'PUT',
        url:`http://localhost:8080/api/v1/placeOrder`,
        contentType:'application/json',
        async:true,
        data:JSON.stringify({
            orderID:orderID,
            orderDate:date,
            accountOwnerName:tempUserName,
            cusName:txtCusName,
            cusPhoneNumber:txtCusPhoneNumber,
            cusStreet:txtCusStreet,
            cusCountry:txtCusCountry,
            cusZipCode:txtCusZipCode,
            cusCreditCardNumber:txtCusCreditCardNumber,
            cusCardHolderName:txtCusCardHolder,
            cusCardExpDate:txtCusCarExpDate,
            cusCardCvv:txtCusCardCvv,
            placeOrderImg:placeOrderImg,
            buyProductName:ProductBuyName,
            buyProductPrice:ProductBuyPrice,
            buyProductQty:ProductBuyQty,
            buyProductTotalPrice:ProductBuyTotal,
            shippingStatus:"Processing",
            shippingDate:"Processing",
            trackingNumber:"Processing",
            estimatedDeliveryDate:"Processing"
        })
    })
}

/*Save Customer*/

$('#btnRegister').click(function () {
    let email = $('#txtUserEmail').val();
    let userName = $('#txtUserName').val();
    let password = $('#txtUserPassword').val();

    $.ajax({
        method:'POST',
        url:`http://localhost:8080/api/v1/customer`,
        contentType:'application/json',
        async:true,
        data:JSON.stringify({
            email:email,
            userName:userName,
            password:password,
        }),
        success:function (data) {
            console.log(data);
            alert("Success!");
            clearTextField();
            login();
        },
        error:function (response) {
            console.log(response)
        }
    });
});

/*Customer login*/

$('#btnSingOut').click(function () {
    Account.style.display='block'
    CustomerProfile.style.display = 'none'
});

/*Change Password*/

$('#btnCusChangePw').click(function () {
    let userName = $('#userName').val();
    let password = $('#txtCusCurrentPw').val();
    let newPassword = $('#txtCusNewPw').val();
    let ConfirmPw = $('#txtCusConfirmPw').val();

    $.ajax({
        method: 'GET',
        url: `http://localhost:8080/api/v1/customer/${userName}/${password}`,

        success:function (response) {
            let resp = response.data;
            console.log(resp)
            if (resp.password===password){
                if (newPassword===ConfirmPw){
                    $.ajax({
                        method:'PUT',
                        url:`http://localhost:8080/api/v1/customer`,
                        contentType:'application/json',
                        async:true,
                        data:JSON.stringify({
                            userName:userName,
                            email:resp.email,
                            password:newPassword
                        }),
                        success:function () {
                            alert("Password Change!")
                            let txtConfirmPw = document.getElementById('txtCusConfirmPw');
                            txtConfirmPw.style='none'
                            $('#txtCusNewPw').val('');
                            $('#txtCusCurrentPw').val('');
                            $('#txtCusConfirmPw').val('');
                        },
                        error:function () {
                            alert("Password Change Fail!")
                        }
                    })
                }else {
                    let txtConfirmPw = document.getElementById('txtCusConfirmPw');
                    txtConfirmPw.style.border='1px solid red';
                    alert("Please Check Again!")
                }

            }else {
                console.log("Error")
                alert("Something Wrong!")
            }
        },
        error:function () {
            alert("Incorrect!");
            console.log("Error")
        }
    })
});

function clearTextField () {
    $('#txtUserEmail').val("");
    $('#txtUserName').val("");
    $('#txtUserPassword').val("");
}
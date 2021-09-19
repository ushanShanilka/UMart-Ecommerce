var PlaceOrderModel = document.getElementById("placeOrderModel");

var PlaceOrderModelClose = document.getElementById("placeOrderModel-close");

function placeOrderModelVisible () {
    PlaceOrderModel.style.visibility= 'visible';
    PlaceOrderModel.style.opacity= '1';
}

PlaceOrderModelClose.addEventListener('click',function () {
    PlaceOrderModel.style.visibility= 'hidden';
    PlaceOrderModel.style.opacity= '0';
});

function closeModel () {
    PlaceOrderModel.style.visibility= 'hidden';
    PlaceOrderModel.style.opacity= '0';
}

$('.table tbody').on('click' , '.removeBtn' , function () {
    $('#tblCart>tr').click(function () {
        let a = $(this).children('td:eq(0)').text();
        let cartNumber = $(this).children('td:eq(1)').text();
        let c = $(this).children('td:eq(2)').text();
        let d = $(this).children('td:eq(3)').text();
        let e = $(this).children('td:eq(4)').text();
        let f = $(this).children('td:eq(5)').text();

        $.ajax({
            method: 'DELETE' ,
            url: `http://localhost:8080/api/v1/cart/?id=${cartNumber}` ,
            success: function ( response ) {
                console.log(response)
                loadAllCartByCustomerUserName();
            }
        })
    })
})

$('.table tbody').on('click' , '.tblBuyNow' , function () {
    $('#tblCart>tr').click(function () {
        placeOrderModelVisible();
        loadAllCartByCustomerUserName();
        let a = $(this).children('td:eq(0)').text();
        let cartNumber = $(this).children('td:eq(1)').text();
        let c = $(this).children('td:eq(2)').text();
        let d = $(this).children('td:eq(3)').text();
        let e = $(this).children('td:eq(4)').text();
        let f = $(this).children('td:eq(5)').text();

        $.ajax({
            method: 'GET',
            url: `http://localhost:8080/api/v1/cart/?number=${cartNumber}`,

            success:function (response) {
                let resp = response.data
                console.log(resp[0].imgScr)

                PlaceOrderImg.src = resp[0].imgScr;
                $('#ProductPlaceOrderName').text(resp[0].productName);
                $('#ProductPlaceOrderPrice').text(resp[0].unitPrice);
                $('#ProductPlaceOrderQty').text(resp[0].qty);
                $('#ProductPlaceOrderTotal').text(resp[0].subTotal);
            }
        })

    })
})

/*------------------------------Place Order-----------------------------------*/

let PlaceOrderImg = document.getElementById("placeOrderImg");
generateOrderId();

function generateOrderId () {
    $.ajax({
        method:'GET',
        url:`http://localhost:8080/api/v1/placeOrder/`,

        success:function (response) {
            let resp = response.data

            let lastNumber = resp[resp.length-1].orderID;
            $('#orderId').text("O00"+(parseInt(lastNumber.split('O00')[1])+1));
            console.log("New Order Id  Is: "+$('#orderId').text())
        }
    })
}

$('#btnPlaceOrder').click(function () {

    let orderID = $('#orderId').text();
    let txtCusName = $('#txtCusName').val();
    let txtCusPhoneNumber = $('#txtCusPhoneNumber').val();
    let txtCusStreet = $('#txtCusStreet').val();
    let txtCusCountry = $('#txtCusCountry').val();
    let txtCusZipCode = $('#txtCusZipCode').val();
    let txtCusCreditCardNumber = $('#txtCusCreditCardNumber').val();
    let txtCusCardHolder = $('#txtCusCardHolder').val();
    let txtCusCarExpDate = $('#txtCusCarExpDate').val();
    let txtCusCardCvv = $('#txtCusCardCvv').val();
    let placeOrderImg = PlaceOrderImg.src;
    let ProductBuyName = $('#ProductPlaceOrderName').text();
    let ProductBuyPrice = $('#ProductPlaceOrderPrice').text();
    let ProductBuyQty = $('#ProductPlaceOrderQty').text();
    let ProductBuyTotal = $('#ProductPlaceOrderTotal').text();

    let tempUserName = $('#tempUserName').val();

    console.log("User Name : "+tempUserName)

    let month = new Date().getMonth();
    let toDay = new Date().getDate();
    let year = new Date().getFullYear();

    let date = month+"/"+toDay+"/"+year

    $.ajax({
        method:"POST",
        url:`http://localhost:8080/api/v1/placeOrder/`,
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
            estimatedDeliveryDate:"Processing",
            submitDate:"Processing"
        }),

        success:function (response) {
            alert("Success !")
            closeModel();
            generateOrderId();
            console.log(response)
        }
    })

});

$('.table tbody').on('click' , '.tblCancelOrder' , function () {
    $('#tblToBeShipped>tr').click(function () {
        let a = $(this).children('td:eq(0)').text();
        let orderId = $(this).children('td:eq(1)').text();
        let c = $(this).children('td:eq(2)').text();
        let d = $(this).children('td:eq(3)').text();
        let e = $(this).children('td:eq(4)').text();
        let f = $(this).children('td:eq(5)').text();

        let b = window.confirm("Do You Want to Cancel Order ?");

        if (b){
            $.ajax({
                method:'DELETE',
                url:`http://localhost:8080/api/v1/placeOrder/?id=${orderId}`,

                success:function (response) {
                    console.log(response)
                    getAllToBeShippedOrder();
                }
            })
        }else {
            getAllToBeShippedOrder();
        }



    })
})

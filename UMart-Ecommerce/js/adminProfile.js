var WaitingForShipment = document.getElementById("waitingForShipment");
WaitingForShipment.style.display = 'block'

var OnShipping = document.getElementById("onShipping");
OnShipping.style.display = 'none'

var AccountSetting = document.getElementById("accountSetting");
AccountSetting.style.display = 'none'

let CompleteShipped = document.getElementById("completeShipped");
CompleteShipped.style.display='none'


$('#btnWaitingForShipment').click(function () {
    WaitingForShipment.style.display = 'block';
    OnShipping.style.display = 'none';
    AccountSetting.style.display = 'none';
    CompleteShipped.style.display='none'
    loadALlWaitingForShipment();
});
$('#btnOnShipping').click(function () {
    WaitingForShipment.style.display = 'none';
    OnShipping.style.display = 'block';
    AccountSetting.style.display = 'none';
    CompleteShipped.style.display='none'
    loadAllOnShippingOrders();
});
$('#btnAccountSetting').click(function () {
    WaitingForShipment.style.display = 'none';
    OnShipping.style.display = 'none';
    AccountSetting.style.display = 'block';
    CompleteShipped.style.display='none'
})
$('#btnCompleteShipped').click(function () {
    WaitingForShipment.style.display = 'none';
    OnShipping.style.display = 'none';
    AccountSetting.style.display = 'none';
    CompleteShipped.style.display='block';
    loadAllCompleteShipped();
})

function loadALlWaitingForShipment () {
    $('#tblWaitingForShipment').empty();
    $.ajax({
            method:'GET',
            url:`http://localhost:8080/api/v1/placeOrder?status=Processing`,

            success:function (response) {
                let resp=response.data;

                for (var i in resp ) {
                    let imgSrc = (resp[ i ].placeOrderImg)
                    let buyProductName = (resp[ i ].buyProductName)
                    let unitPrice = (resp[ i ].buyProductPrice)
                    let buyProductQty= (resp[ i ].buyProductQty)
                    let orderID = (resp[ i ].orderID)
                    let cusName = (resp[ i ].cusName)
                    let cusStreet = (resp[ i ].cusStreet)
                    let cusZipCode = (resp[ i ].cusZipCode)
                    let cusCountry = (resp[ i ].cusCountry)
                    let cusPhoneNumber = (resp[ i ].cusPhoneNumber)
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
                    <td>${cusName},<br>${cusStreet},<br>${cusZipCode},<br>${cusCountry},<br>${cusPhoneNumber}</br></td>
                    <td>${orderDate}</td>
                    <td> <button id="btnAddTracking" class="btn tblAddTracking">Add Tracking Number</button> </td>
                    </tr>`

                    $('#tblWaitingForShipment').append(row);
                }
            }
        })
}

/*----------------------Add Tracking Model----------------------------*/

var AddTrackingModel = document.getElementById("addTrackingModal");

var AddTrackingModelClose = document.getElementById("addTrackingModal-close");

let AddTrackingImg = document.getElementById("addTrackingImg");


function addTrackingModelVisible () {
    AddTrackingModel.style.visibility= 'visible';
    AddTrackingModel.style.opacity= '1';
}

AddTrackingModelClose.addEventListener('click',function () {
    AddTrackingModel.style.visibility= 'hidden';
    AddTrackingModel.style.opacity= '0';
});

function addTrackingModelCloseModel () {
    AddTrackingModel.style.visibility= 'hidden';
    AddTrackingModel.style.opacity= '0';
}

$('.table tbody').on('click' , '.tblAddTracking' , function () {
     $('#tblWaitingForShipment>tr').click(function () {
         console.log("LOG")
         addTrackingModelVisible();
        let a = $(this).children('td:eq(0)').text();
        let orderID = $(this).children('td:eq(1)').text();

         console.log(orderID)
        $.ajax({
            method: 'GET',
            url: `http://localhost:8080/api/v1/placeOrder/${orderID}`,

            success:function (response) {
                loadALlWaitingForShipment();
                let resp=response.data
                console.log(resp)

                AddTrackingImg.src = resp.placeOrderImg;
                $('#trackOrderId').text(resp.orderID);
                $('#trackProductName').text(resp.buyProductName);
                $('#trackUnitPrice').text(resp.buyProductPrice);
                $('#trackQty').text('qty ' +resp.buyProductQty);
                $('#cusName').text(resp.cusName);
                $('#cusStreet').text(resp.cusStreet);
                $('#cusZIpCode').text(resp.cusZipCode);
                $('#cusCountry').text(resp.cusCountry);

                $('#btnSave').click(function () {
                    let txtEDDDate = $('#txtEDDDate').val();
                    let txtTrackingNumber = $('#txtTrackingNumber').val();

                    let month = new Date().getMonth();
                    let toDay = new Date().getDate();
                    let year = new Date().getFullYear();

                    let date = month+"/"+toDay+"/"+year

                    $.ajax({
                        method: 'PUT' ,
                        url: `http://localhost:8080/api/v1/placeOrder/` ,
                        contentType: 'application/json' ,
                        async: true ,
                        data: JSON.stringify({
                            orderID: resp.orderID ,
                            orderDate: resp.orderDate ,
                            accountOwnerName: resp.accountOwnerName ,
                            cusName: resp.cusName ,
                            cusPhoneNumber: resp.cusPhoneNumber ,
                            cusStreet: resp.cusStreet ,
                            cusCountry: resp.cusCountry ,
                            cusZipCode: resp.cusZipCode ,
                            cusCreditCardNumber: resp.cusCreditCardNumber ,
                            cusCardHolderName: resp.cusCardHolderName ,
                            cusCardExpDate: resp.cusCardExpDate ,
                            cusCardCvv: resp.cusCardCvv ,
                            placeOrderImg: resp.placeOrderImg,
                            buyProductName: resp.buyProductName ,
                            buyProductPrice: resp.buyProductPrice ,
                            buyProductQty: resp.buyProductQty ,
                            buyProductTotalPrice: resp.buyProductTotalPrice ,
                            shippingStatus: "OnShipped" ,
                            shippingDate: date ,
                            trackingNumber: txtTrackingNumber ,
                            estimatedDeliveryDate: txtEDDDate ,
                            submitDate: "Processing"
                        }),

                        success:function (response) {
                            alert('Wede Goda');
                            loadALlWaitingForShipment();
                            $('#txtEDDDate').val('');
                            $('#txtTrackingNumber').val('');
                            addTrackingModelCloseModel();
                        }
                    })
                })

            }
        })
     })
})

function loadAllOnShippingOrders () {
    $('#tblOnShipping').empty();
    $.ajax({
        method:`GET`,
        url:`http://localhost:8080/api/v1/placeOrder/?status=OnShipped`,

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
                let cusName = (resp[ i ].cusName)
                let cusStreet = (resp[ i ].cusStreet)
                let cusCountry = (resp[ i ].cusCountry)
                let cusPhoneNumber = (resp[ i ].cusPhoneNumber)
                let cusZipCode = (resp[ i ].cusZipCode)
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
                    <td>${cusName},<br>${cusStreet},<br>${cusZipCode},<br>${cusCountry},<br>${cusPhoneNumber}</br></td>
                    <td>${orderDate}</td>
                    <td>${shippingDate}</td>
                    <td>${trackingNumber}</td>
                    <td>${estimatedDeliveryDate}</td>
                    <td>${shippingStatus} </td>
                    </tr>`

                $('#tblOnShipping').append(row);
            }
        }
    })
}

function loadAllCompleteShipped () {
    $('#tblCompleteShipped').empty();
    $.ajax({
        method:`GET`,
        url:`http://localhost:8080/api/v1/placeOrder/?status=ShippedComplete`,

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
                let cusName = (resp[ i ].cusName)
                let cusStreet = (resp[ i ].cusStreet)
                let cusCountry = (resp[ i ].cusCountry)
                let cusPhoneNumber = (resp[ i ].cusPhoneNumber)
                let cusZipCode = (resp[ i ].cusZipCode)
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
                    <td>${cusName},<br>${cusStreet},<br>${cusZipCode},<br>${cusCountry},<br>${cusPhoneNumber}</br></td>
                    <td>${orderDate}</td>
                    <td>${shippingDate}</td>
                    <td>${trackingNumber}</td>
                    <td>${estimatedDeliveryDate}</td>
                    <td>${shippingStatus} </td>
                    </tr>`

                $('#tblCompleteShipped').append(row);
            }
        }
    })
}

$("#btnUpdateAdmin").click(function () {
    let adminTempEmail = $('#adminTempEmail').text();
    let adminTempUserName = $('#adminTempUserName').text();


    let currentPw = $('#txtCurrentPw').val();
    let newPW = $('#txtNewPw').val();
    let confirmPw = $('#txtConfirmPw').val();


    $.ajax({
        method:'GET',
        url:`http://localhost:8080/api/v1/admin/${adminTempEmail}/${currentPw}`,

        success:function (response) {
            if (newPW===confirmPw){
                $.ajax({
                    method:'PUT',
                    url:`http://localhost:8080/api/v1/admin/`,
                    contentType:'application/json',
                    async:true,
                    data:JSON.stringify({
                        email:adminTempEmail,
                        userName:adminTempUserName,
                        password:confirmPw
                    }),
                    success:function () {
                        alert("Password Change!")
                        let txtConfirmPw = document.getElementById('txtConfirmPw');
                        txtConfirmPw.style='none';
                        $('#txtCurrentPw').val('');
                        $('#txtNewPw').val('');
                        $('#txtConfirmPw').val('');
                    }
                })
            }else {
                let txtConfirmPw = document.getElementById('txtConfirmPw');
                txtConfirmPw.style.border='1px solid red';
                alert("Please Check Again!")
            }

        }
    })

    //
    // $.ajax({
    //     method:`PUT`,
    //     url:'http://localhost:8080/api/v1/admin',
    //
    //     success:function () {
    //
    //     }
    // })
})
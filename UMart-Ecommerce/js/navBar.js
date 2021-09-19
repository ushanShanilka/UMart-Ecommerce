var btnHome = document.getElementById("btnHome");
var btnCart = document.getElementById("btnCart");
var btnProduct = document.getElementById("btnProduct");
var btnAccount = document.getElementById("btnAccount");
var btnProductDetails1 = document.getElementById("btnProductDetails1");
var btnProductDetails2 = document.getElementById("btnProductDetails2");
var btnProductDetails3 = document.getElementById("btnProductDetails3");
var btnProductDetails4 = document.getElementById("btnProductDetails4");

var AdminProfile = document.getElementById("adminProfile");
AdminProfile.style.display = 'none'

var Home = document.getElementById("Home")
Home.style.display='block';

var Cart = document.getElementById("Cart")
Cart.style.display='none';

var Product = document.getElementById("Product")
Product.style.display='none';

var Account = document.getElementById("Profile")
Account.style.display='none';

var ProductDetails = document.getElementById("ProductDetails")
ProductDetails.style.display='none';

var CustomerProfile = document.getElementById('customerProfile')
CustomerProfile.style.display = 'none'

var CartModel = document.getElementById("homeModel");

var CartModelClose = document.getElementById("cartModel-close");

function CartModelVisible () {
    CartModel.style.visibility= 'visible';
    CartModel.style.opacity= '1';
}

CartModelClose.addEventListener('click',function () {
    CartModel.style.visibility= 'hidden';
    CartModel.style.opacity= '0';
});
function CloseCartModel(){
    CartModel.style.visibility= 'hidden';
    CartModel.style.opacity= '0';
}

btnCart.addEventListener('click',function () {
    CartModelVisible();
    $('#tblCart').empty();
    $('#btnCartSingIn').click(function () {
        let tempUserName = $('#cartUserName').val();
        let tempPassword = $('#cartPassword').val();

        $.ajax({
            method: 'GET',
            url: `http://localhost:8080/api/v1/customer/${tempUserName}/${tempPassword}`,

            success:function (response) {
                let resp = response.data;
                if (resp.password===tempPassword){
                    Home.style.display = 'none';
                    Cart.style.display = 'block';
                    Product.style.display = 'none';
                    Account.style.display = 'none';
                    ProductDetails.style.display = 'none';
                    ProductDetails.style.display = 'none';
                    CustomerProfile.style.display = 'none';
                    AdminProfile.style.display = 'none';
                    $('#tblCompleteOrder').empty();
                    loadAllCartByCustomerUserName();
                    $('#tempUserName').val(tempUserName)
                    CloseCartModel();
                }else {
                    console.log("Error")
                    alert("Check Password !")
                }
            },
            error:function () {
                alert("Incorrect!");
                console.log("Error")
            }
        })
    });
});

btnHome.addEventListener('click',function () {
    Home.style.display='block';
    Cart.style.display='none';
    Product.style.display='none';
    Account.style.display='none';
    ProductDetails.style.display='none';
    ProductDetails.style.display='none';
    CustomerProfile.style.display = 'none';
    AdminProfile.style.display = 'none';
});

btnAccount.addEventListener('click',function () {
    Home.style.display='none';
    Cart.style.display='none';
    Product.style.display='none';
    Account.style.display='block';
    ProductDetails.style.display='none';
    ProductDetails.style.display='none';
    CustomerProfile.style.display = 'none';
    AdminProfile.style.display = 'none';
});

btnProduct.addEventListener('click',function () {
    Home.style.display='none';
    Cart.style.display='none';
    Product.style.display='block';
    Account.style.display='none';
    ProductDetails.style.display='none';
    ProductDetails.style.display='none';
    CustomerProfile.style.display = 'none';
    AdminProfile.style.display = 'none';
});

btnProductDetails1.addEventListener('click' , function () {
    Home.style.display='none';
    Cart.style.display='none';
    Product.style.display='none';
    Account.style.display='none';
    ProductDetails.style.display='block';
    CustomerProfile.style.display = 'none';
    AdminProfile.style.display = 'none';
});

btnProductDetails2.addEventListener('click' , function () {
    Home.style.display='none';
    Cart.style.display='none';
    Product.style.display='none';
    Account.style.display='none';
    ProductDetails.style.display='block';
    CustomerProfile.style.display = 'none';
    AdminProfile.style.display = 'none';
});

btnProductDetails3.addEventListener('click' , function () {
    Home.style.display='none';
    Cart.style.display='none';
    Product.style.display='none';
    Account.style.display='none';
    ProductDetails.style.display='block';
    CustomerProfile.style.display = 'none';
    AdminProfile.style.display = 'none';
});

btnProductDetails4.addEventListener('click' , function () {
    Home.style.display='none';
    Cart.style.display='none';
    Product.style.display='none';
    Account.style.display='none';
    ProductDetails.style.display='block';
    CustomerProfile.style.display = 'none';
    AdminProfile.style.display = 'none';
});

function clearText (){
    $('#tempPassword').val('');
}

$('#btnLogin').click(function () {
    let userName = $('#userName').val();
    let password = $('#password').val();

        $('#ownerInfo').text(`Hello ${userName} Have a Nice Day!`);

    $.ajax({
        method: 'GET',
        url: `http://localhost:8080/api/v1/customer/${userName}/${password}`,

        success:function (response) {
            getAllCompleteOrder();
            let resp = response.data;
            if (resp.password===password){
                Account.style.display='none'
                CustomerProfile.style.display = 'block'
            }else {
                console.log("Error")
                alert("Something Wrong!")
            }
        },
        error:function (response) {
            alert("Incorrect!");
            console.log("Error")
        }
    })
});

$("#btnAdminLogin").click(function () {
    let email = $('#adminEmail').val();
    let password = $('#adminPassword').val();

    $.ajax({
        method:'GET',
        url:`http://localhost:8080/api/v1/admin/${email}/${password}`,

        success:function (response) {
            loadALlWaitingForShipment();
            let resp = response.data;
            if (resp.password===password){
                Account.style.display='none'
                AdminProfile.style.display = 'block'
                $('#adminTempEmail').text(resp.email);
                $('#adminTempUserName').text(resp.userName);
                $('#adminTempPw').text(resp.userName);
                $('#adminWelcomeNote').text(`Hello Admin ${resp.userName}. Have a Nice Day!`)
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
})
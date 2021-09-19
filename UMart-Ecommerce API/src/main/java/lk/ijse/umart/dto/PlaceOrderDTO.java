package lk.ijse.umart.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class PlaceOrderDTO {
    private String orderID;
    private String orderDate;
    private String accountOwnerName;
    private String cusName;
    private String  cusPhoneNumber;
    private String cusStreet;
    private String cusCountry;
    private int cusZipCode;
    private String cusCreditCardNumber;
    private String cusCardHolderName;
    private String cusCardExpDate;
    private int cusCardCvv;
    private String placeOrderImg;
    private String buyProductName;
    private String buyProductPrice;
    private String buyProductQty;
    private String buyProductTotalPrice;
    private String shippingStatus;
    private String shippingDate;
    private String trackingNumber;
    private String estimatedDeliveryDate;
    private String submitDate;
}

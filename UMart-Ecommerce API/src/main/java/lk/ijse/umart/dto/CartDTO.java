package lk.ijse.umart.dto;

import lk.ijse.umart.entity.Customer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



@AllArgsConstructor
@NoArgsConstructor
@Data
public class CartDTO {
    private String  number;
    private String imgScr;
    private String productName;
    private String unitPrice;
    private String size;
    private int qty;
    private String tax;
    private String subTotal;
    private Customer user_NAME;
}

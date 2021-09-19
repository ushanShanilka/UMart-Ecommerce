package lk.ijse.umart.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Cart {
    @Id
    private String number;
    private String imgScr;
    private String productName;
    private String unitPrice;
    private String size;
    private int qty;
    private String tax;
    private String subTotal;
    @OneToOne
    @JoinColumn(name = "user_Name",referencedColumnName = "userName")
    private Customer user_Name;
}

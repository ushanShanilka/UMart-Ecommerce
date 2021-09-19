package lk.ijse.umart.service;

import lk.ijse.umart.dto.CartDTO;
import lk.ijse.umart.entity.Cart;

import java.util.ArrayList;
import java.util.List;

public interface CartService {
    boolean addCart ( CartDTO dto );

    boolean deleteCart ( String id );

    CartDTO searchCart ( String id );

    ArrayList<CartDTO> getAllCart ( );

    boolean updateCustomer ( CartDTO dto );

    List<Cart> findAllCartByUserName ( String userName);

    List<Cart> findAllCartByNumber ( String number);

}

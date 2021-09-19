package lk.ijse.umart.service;

import lk.ijse.umart.dto.PlaceOrderDTO;
import lk.ijse.umart.entity.PlaceOrder;

import java.util.ArrayList;
import java.util.List;

public interface PlaceOrderService {
    boolean addOrder ( PlaceOrderDTO dto );

    boolean deleteOrder ( String id );

    PlaceOrderDTO searchOrder ( String id );

    ArrayList<PlaceOrderDTO> getAllOrder ( );

    boolean updateOrder ( PlaceOrderDTO dto );

    List<PlaceOrder> findPlaceOrderByAccountOwnerNameAndShippingStatus ( String userName, String status);

    List<PlaceOrder> findPlaceOrderByShippingStatus (String status);
}

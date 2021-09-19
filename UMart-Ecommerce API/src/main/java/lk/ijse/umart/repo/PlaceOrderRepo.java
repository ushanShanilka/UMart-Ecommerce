package lk.ijse.umart.repo;

import lk.ijse.umart.dto.PlaceOrderDTO;
import lk.ijse.umart.entity.PlaceOrder;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlaceOrderRepo extends JpaRepository<PlaceOrder,String> {
    List<PlaceOrder> findPlaceOrderByAccountOwnerNameAndShippingStatus (String userName,String status);
    List<PlaceOrder> findPlaceOrderByShippingStatus (String status);
}

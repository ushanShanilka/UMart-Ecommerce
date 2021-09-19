package lk.ijse.umart.repo;

import lk.ijse.umart.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CartRepo extends JpaRepository<Cart,String> {
    @Query(value = "select * from  cart where user_Name =?1",nativeQuery=true)
    List<Cart> getAllCartForUserName( String userName );

    List<Cart> findCartByNumber(String number);

}

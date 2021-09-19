package lk.ijse.umart.repo;

import lk.ijse.umart.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepo extends JpaRepository<Customer,String> {
    //Optional<Customer> getCustomerByUserNameAndPassword ( String userName );
}

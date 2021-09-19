package lk.ijse.umart.repo;

import lk.ijse.umart.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AdminRepo extends JpaRepository<Admin,String > {
    Optional<Admin> findAdminByEmailAndPassword(String email, String password);
}

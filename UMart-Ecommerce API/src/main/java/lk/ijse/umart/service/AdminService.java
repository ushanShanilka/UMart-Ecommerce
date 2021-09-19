package lk.ijse.umart.service;

import lk.ijse.umart.dto.AdminDTO;
import lk.ijse.umart.entity.Admin;


import java.util.ArrayList;
import java.util.Optional;

public interface AdminService {
    boolean addAdmin ( AdminDTO dto );

    boolean deleteAdmin ( String id );

    AdminDTO searchAdmin ( String id );

    ArrayList<AdminDTO> getAllAdmin ( );

    boolean updateAdmin ( AdminDTO dto );

    AdminDTO findAdminByEmailAndPassword( String email, String password);
}

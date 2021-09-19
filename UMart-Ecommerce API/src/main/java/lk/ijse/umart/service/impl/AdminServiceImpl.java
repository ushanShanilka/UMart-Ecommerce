package lk.ijse.umart.service.impl;

import lk.ijse.umart.dto.AdminDTO;
import lk.ijse.umart.entity.Admin;
import lk.ijse.umart.repo.AdminRepo;
import lk.ijse.umart.service.AdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public boolean addAdmin ( AdminDTO dto ) {
        adminRepo.save ( modelMapper.map ( dto, Admin.class ) );
        return true;
    }

    @Override
    public boolean deleteAdmin ( String id ) {
        return false;
    }

    @Override
    public AdminDTO searchAdmin ( String id ) {
        return null;
    }

    @Override
    public ArrayList<AdminDTO> getAllAdmin ( ) {
        return null;
    }

    @Override
    public boolean updateAdmin ( AdminDTO dto ) {
        adminRepo.save ( modelMapper.map ( dto,Admin.class ) );
        return true;
    }

    @Override
    public AdminDTO findAdminByEmailAndPassword ( String email , String password ) {
        Optional<Admin> adminByEmailAndPassword = adminRepo.findAdminByEmailAndPassword ( email , password );
        if ( adminByEmailAndPassword.isPresent () ){
            Admin admin = adminByEmailAndPassword.get ( );
            return new AdminDTO ( admin.getEmail (),admin.getUserName (),admin.getPassword () );
        }
        return null;
    }

}

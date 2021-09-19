package lk.ijse.umart.service.impl;

import lk.ijse.umart.dto.CustomerDTO;
import lk.ijse.umart.entity.Customer;
import lk.ijse.umart.exception.ValidateException;
import lk.ijse.umart.repo.CustomerRepo;
import lk.ijse.umart.service.CustomerService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService {

    @Autowired
    private CustomerRepo customerRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public boolean addCustomer ( CustomerDTO dto ) {
        if ( customerRepo.existsById ( dto.getEmail () ) ){
            throw new ValidateException ( "Customer AllReady Exit !" );
        }
        customerRepo.save ( modelMapper.map ( dto, Customer.class ) );
        return true;
    }

    @Override
    public boolean deleteCustomer ( String id ) {
        return false;
    }

    @Override
    public CustomerDTO searchCustomer ( String id ) {
        return null;
    }

    @Override
    public ArrayList<CustomerDTO> getAllCustomers ( ) {
        return null;
    }

    @Override
    public boolean updateCustomer ( CustomerDTO dto ) {
        customerRepo.save ( modelMapper.map ( dto, Customer.class ) );
        return true;
//        if ( customerRepo.existsById ( dto.getPassword () ) ){
//
//        }else {
//            throw new ValidateException ( "Wrong Current Password !" );
//        }

    }


    @Override
    public CustomerDTO findCustomer ( String userName  ) {
//        Optional<Customer> customerByUserNameAndPassword = customerRepo.getCustomerByUserNameAndPassword ( userName );
//        if ( customerByUserNameAndPassword.isPresent () ){
//            Customer customer = customerByUserNameAndPassword.get ( );
//            return modelMapper.map ( customer,CustomerDTO.class );
//        }
//        return null;
        Optional<Customer> byId = customerRepo.findById ( userName );
        if ( byId.isPresent () ){
            Customer customer = byId.get ( );
            return modelMapper.map ( customer,CustomerDTO.class );
        }
        return null;
    }
}

package lk.ijse.umart.controller;

import lk.ijse.umart.dto.CustomerDTO;
import lk.ijse.umart.exception.NotFoundException;
import lk.ijse.umart.service.CustomerService;
import lk.ijse.umart.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/v1/customer")
@CrossOrigin
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @PostMapping
    public ResponseEntity saveCustomer( @RequestBody CustomerDTO dto ){
        if ( dto.getEmail ().trim ().length ()<=0 ){
            throw new NotFoundException ( "Email Can not be Empty !" );
        }
        customerService.addCustomer ( dto );
        return new ResponseEntity ( new StandardResponse ( "201","Done",dto ), HttpStatus.CREATED );
    }

    @GetMapping(path = "/{userName}/{password}")
    public ResponseEntity findCustomerUserNameAndPassword ( @PathVariable String userName , @PathVariable String password ){
        CustomerDTO customer = customerService.findCustomer ( userName );
        return new ResponseEntity ( new StandardResponse ( "200", "Done", customer ), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity updateCustomer(@RequestBody CustomerDTO dto){
        boolean b = customerService.updateCustomer ( dto );
        return new ResponseEntity (new StandardResponse ( "200","Done",b ),HttpStatus.OK );
    }
}

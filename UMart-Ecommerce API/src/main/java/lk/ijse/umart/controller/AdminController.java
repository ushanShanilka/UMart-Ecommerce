package lk.ijse.umart.controller;

import lk.ijse.umart.dto.AdminDTO;
import lk.ijse.umart.service.AdminService;
import lk.ijse.umart.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping
    public ResponseEntity saveAdmin( @RequestBody AdminDTO dto ){
        boolean b = adminService.addAdmin ( dto );
        return new ResponseEntity ( new StandardResponse ( "201","Done",b ), HttpStatus.CREATED );
    }

    @GetMapping(path = "/{email}/{password}")
    public ResponseEntity getAdminByEmailAndPassword(@PathVariable String email,@PathVariable String password){
        AdminDTO adminByEmailAndPassword = adminService.findAdminByEmailAndPassword ( email , password );
        return new ResponseEntity ( new StandardResponse ( "200","Done",adminByEmailAndPassword ),HttpStatus.OK );
    }

    @PutMapping
    public ResponseEntity adminPasswordChange(@RequestBody AdminDTO dto){
        boolean b = adminService.updateAdmin ( dto );
        return new ResponseEntity ( new StandardResponse ( "200","Done",b),HttpStatus.OK );
    }
}

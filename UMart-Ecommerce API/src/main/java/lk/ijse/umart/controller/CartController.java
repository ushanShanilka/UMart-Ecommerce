package lk.ijse.umart.controller;

import lk.ijse.umart.dto.CartDTO;
import lk.ijse.umart.entity.Cart;
import lk.ijse.umart.service.CartService;
import lk.ijse.umart.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping
    public ResponseEntity saveCart( @RequestBody CartDTO dto ){
        cartService.addCart ( dto );
        return new ResponseEntity ( new StandardResponse ( "200", "Done", dto), HttpStatus.CREATED );
    }

    @GetMapping
    public ResponseEntity getAllCart(){
        ArrayList<CartDTO> allCart = cartService.getAllCart ( );
        return new ResponseEntity ( new StandardResponse ( "200","Done",allCart ),HttpStatus.OK );
    }

    @GetMapping(path = "/{userName}")
    public ResponseEntity getAllCartByUserName(@PathVariable String userName){
        List<Cart> allCartByUserName = cartService.findAllCartByUserName ( userName );
        return new ResponseEntity ( new StandardResponse ( "200","Done",allCartByUserName ),HttpStatus.OK );
    }

    @DeleteMapping(params = {"id"})
    public ResponseEntity deleteCart (@RequestParam String id){
        boolean b = cartService.deleteCart ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Done",b ),HttpStatus.OK );
    }

    @GetMapping(params = {"number"})
    public ResponseEntity findCartByNumber(@RequestParam String number){
        List<Cart> allCartByNumber = cartService.findAllCartByNumber ( number );
        return new ResponseEntity ( new StandardResponse ( "200", "Done", allCartByNumber ), HttpStatus.OK);
    }

}

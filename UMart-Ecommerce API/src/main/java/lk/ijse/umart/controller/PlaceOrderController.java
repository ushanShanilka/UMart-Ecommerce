package lk.ijse.umart.controller;

import lk.ijse.umart.dto.PlaceOrderDTO;
import lk.ijse.umart.entity.PlaceOrder;
import lk.ijse.umart.service.PlaceOrderService;
import lk.ijse.umart.util.StandardResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("api/v1/placeOrder")
@CrossOrigin
public class PlaceOrderController {

    @Autowired
    private PlaceOrderService placeOrderService;

    @PostMapping
    public ResponseEntity saveOrder( @RequestBody PlaceOrderDTO dto ){
        boolean order = placeOrderService.addOrder ( dto );
        return new ResponseEntity ( new StandardResponse ( "201", "Done", order), HttpStatus.CREATED );
    }

    @GetMapping
    public ResponseEntity getAllOrder(){
        ArrayList<PlaceOrderDTO> allOrder = placeOrderService.getAllOrder ( );
        return new ResponseEntity ( new StandardResponse ( "200","Done",allOrder ),HttpStatus.OK );
    }

    @GetMapping(path ="/{ownerName}/{status}")
    public ResponseEntity getAllOrderByOwnerNameAndStatus (  @PathVariable String ownerName , @PathVariable String status ){
        List<PlaceOrder> ownerNameAndStatus = placeOrderService.findPlaceOrderByAccountOwnerNameAndShippingStatus ( ownerName , status );
        return new ResponseEntity(new StandardResponse ( "200","Done",ownerNameAndStatus ),HttpStatus.OK);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity getOrderById(@PathVariable String id){
        PlaceOrderDTO dto = placeOrderService.searchOrder ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Done",dto ),HttpStatus.OK );
    }

    @DeleteMapping(params = {"id"})
    public ResponseEntity deleteOrder(@RequestParam String id ){
        boolean deleteOrder = placeOrderService.deleteOrder ( id );
        return new ResponseEntity ( new StandardResponse ( "200","Done",deleteOrder ),HttpStatus.OK );
    }

    @PutMapping
    public ResponseEntity updateOrder (@RequestBody PlaceOrderDTO dto){
        boolean updateOrder = placeOrderService.updateOrder ( dto );
        return new ResponseEntity ( new StandardResponse ( "200","Done",updateOrder ),HttpStatus.OK );
    }

    @GetMapping(params = {"status"})
    public ResponseEntity getAllOrderByStatus(@RequestParam String status ){
        List< PlaceOrder > OrdersByShippingStatus = placeOrderService.findPlaceOrderByShippingStatus ( status );
        return new ResponseEntity(new StandardResponse ( "200","Done",OrdersByShippingStatus ),HttpStatus.OK);
    }
}

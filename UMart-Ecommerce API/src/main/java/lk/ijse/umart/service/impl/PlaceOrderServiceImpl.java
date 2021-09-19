package lk.ijse.umart.service.impl;

import lk.ijse.umart.dto.PlaceOrderDTO;
import lk.ijse.umart.entity.PlaceOrder;
import lk.ijse.umart.exception.ValidateException;
import lk.ijse.umart.repo.PlaceOrderRepo;
import lk.ijse.umart.service.PlaceOrderService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class PlaceOrderServiceImpl implements PlaceOrderService {
    @Autowired
    private PlaceOrderRepo placeOrderRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public boolean addOrder ( PlaceOrderDTO dto ) {
        placeOrderRepo.save ( modelMapper.map ( dto, PlaceOrder.class ) );
        return true;
    }

    @Override
    public boolean deleteOrder ( String id ) {
        if ( placeOrderRepo.existsById ( id ) ){
            PlaceOrderDTO dto = searchOrder ( id );
            placeOrderRepo.delete ( modelMapper.map ( dto,PlaceOrder.class ) );
            return true;
        }
        throw new ValidateException ( "Empty Order !" );
    }

    @Override
    public PlaceOrderDTO searchOrder ( String id ) {
        if ( placeOrderRepo.existsById ( id ) ){
            Optional<PlaceOrder> order = placeOrderRepo.findById ( id );
            if ( order.isPresent () ){
                return modelMapper.map ( order.get (),PlaceOrderDTO.class );
            }
        }
        throw new ValidateException ( "Empty Order!" );
    }

    @Override
    public ArrayList<PlaceOrderDTO> getAllOrder ( ) {
        List<PlaceOrder> all = placeOrderRepo.findAll ( );
        return modelMapper.map ( all,new TypeToken<ArrayList<PlaceOrderDTO>> (){}.getType () );
    }

    @Override
    public boolean updateOrder ( PlaceOrderDTO dto ) {
        if ( placeOrderRepo.existsById ( dto.getOrderID () ) ){
            placeOrderRepo.save ( modelMapper.map ( dto,PlaceOrder.class ) );
            return true;
        }
        throw new ValidateException ( "Empty Order!" );
    }

    @Override
    public List<PlaceOrder> findPlaceOrderByAccountOwnerNameAndShippingStatus ( String userName , String status ) {
        List<PlaceOrder> ownerNameAndStatus = placeOrderRepo.findPlaceOrderByAccountOwnerNameAndShippingStatus ( userName , status );
        return modelMapper.map ( ownerNameAndStatus,new TypeToken<List<PlaceOrder>> (){}.getType () );
    }

    @Override
    public List< PlaceOrder > findPlaceOrderByShippingStatus ( String status ) {
        List< PlaceOrder > placeOrderByShippingStatus = placeOrderRepo.findPlaceOrderByShippingStatus ( status );
        return modelMapper.map ( placeOrderByShippingStatus,new TypeToken<List<PlaceOrder>> (){}.getType () );
    }
}

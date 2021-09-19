package lk.ijse.umart.service.impl;

import lk.ijse.umart.dto.CartDTO;
import lk.ijse.umart.entity.Cart;
import lk.ijse.umart.exception.ValidateException;
import lk.ijse.umart.repo.CartRepo;
import lk.ijse.umart.service.CartService;
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
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public boolean addCart ( CartDTO dto ) {
        cartRepo.save ( modelMapper.map ( dto, Cart.class ) );
        return true;
    }

    @Override
    public boolean deleteCart ( String id ) {
        if ( cartRepo.existsById ( id ) ){
            CartDTO cartDTO = searchCart ( id );
            Cart cart = modelMapper.map ( cartDTO , Cart.class );
            cartRepo.delete ( cart );
            return true;
        }
        throw new ValidateException ( "No Cart !" );
    }

    @Override
    public CartDTO searchCart ( String id ) {
        if ( cartRepo.existsById ( id ) ){
            Optional<Cart> cart = cartRepo.findById ( id );
            if ( cart.isPresent () ){
                return modelMapper.map ( cart.get (),CartDTO.class );
            }
        }
        throw new ValidateException ( "No Cart ! " );
    }

    @Override
    public ArrayList<CartDTO> getAllCart ( ) {
        List<Cart> all = cartRepo.findAll ( );
        return modelMapper.map ( all,new TypeToken<ArrayList<CartDTO>> (){}.getType () );
    }

    @Override
    public boolean updateCustomer ( CartDTO dto ) {
        return false;
    }

    @Override
    public List<Cart> findAllCartByUserName ( String userName ) {
        List<Cart> allCartForUserName = cartRepo.getAllCartForUserName ( userName );
        return modelMapper.map ( allCartForUserName,new TypeToken<List<Cart>> (){}.getType () );
    }

    @Override
    public List<Cart> findAllCartByNumber ( String number ) {
        List<Cart> cartByNumber = cartRepo.findCartByNumber ( number );
        return modelMapper.map ( cartByNumber,new TypeToken<List<Cart>> (){}.getType () );
    }

}

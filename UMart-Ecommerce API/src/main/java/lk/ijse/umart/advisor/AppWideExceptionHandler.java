package lk.ijse.umart.advisor;

import lk.ijse.umart.exception.NotFoundException;
import lk.ijse.umart.exception.ValidateException;
import lk.ijse.umart.util.StandardResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@CrossOrigin
public class AppWideExceptionHandler {

    //client side = 400;
    //server side = 500;

    @ExceptionHandler(Exception.class)
    public ResponseEntity handelException( Exception e){
        return new ResponseEntity ( new StandardResponse ( "500", "ERROR", e.getMessage () ), HttpStatus.INTERNAL_SERVER_ERROR );
    }

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity handelNotFoundException( NotFoundException e){
        return new ResponseEntity ( new StandardResponse ( "500", "ERROR", e.getMessage () ), HttpStatus.NOT_FOUND );
    }

    @ExceptionHandler(ValidateException.class)
    public ResponseEntity handelValidationException( ValidateException e){
        return new ResponseEntity ( new StandardResponse ( "500", "ERROR", e.getMessage () ), HttpStatus.BAD_REQUEST );
    }
}

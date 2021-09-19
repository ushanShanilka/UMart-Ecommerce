package lk.ijse.umart.util;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
@NoArgsConstructor
public class StandardResponse {
    private String code;
    private Object message;
    private Object data;
}

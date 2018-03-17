package gundulf.api;

import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")
class OrderController {

    @Autowired
    OrderService orderService;

    @Autowired
    ProductService productService;


    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_ORDERS}")
    private String root;


    /**
     * ORDER-003 - the_shop_holder_lists_the_orders
     * <p>
     * as a shop holder
     * I want to list all my orders
     * so that I can track what I asked
     * and possibly validate returns
     */
    @GetMapping("/shop/{shop}")
    ResponseEntity<String> shopOrders(@PathVariable String shop) {

        return apiBouncer.get(root + shop);

    }

    /**
     * ORDER-004 - the_shop_holder_list_the_products_to_place_orders
     * <p>
     * as a shop holder
     * I want to list all the products of a producer
     * so I can place an order for their products
     * and possibly modify or cancel my commands
     */
    @GetMapping("/shop/{shop}/products/{producer}")
    List<OrderLine> dailyOrders(@PathVariable String shop,
                                            @PathVariable String producer) {

        Map<String, OrderLine> orderLineMap = productService.mapProductLines(shop, producer);

        Map<String, OrderLine> shopOrders = orderService.mapOrderLines( shop, producer);

        orderLineMap.putAll(shopOrders);

        List<OrderLine> result = orderLineMap.values().stream().collect(Collectors.toList());

        result.sort((l, r) -> {
            if(l.getDeadline().equals(r.getDeadline())){
                return l.getProduct().compareTo(r.getProduct());
            }
            return l.getDeadline().compareTo(r.getDeadline());
        });
        return result;
    }



    /**
     *
     * ORDER-004 - the_shop_holder_list_the_products_to_place_orders
     *
     * as a shop holder
     * I want to list all the products of a producer
     * so I can place an order on it
     * and possibly modify it
     */
    @PostMapping(value = "/shop/{shop}")
    ResponseEntity<?> create(@PathVariable String shop,
                             @RequestBody String order) {

        return apiBouncer.post(root + shop, order);

    }

    /**
     *
     * ORDER-004 - the_shop_holder_list_the_products_to_place_orders
     *
     * as a shop holder
     * I want to list all the products of a producer
     * so I can place an order on it
     * and possibly modify it
     */
    @PutMapping(value = "/shop/{shop}/{id}")
    ResponseEntity<?> update(@PathVariable String shop,
                                  @PathVariable String id,
                                  @RequestBody String order) {

        return apiBouncer.put(root + shop + "/" + id, order);

    }

    @DeleteMapping(value = "/shop/{shop}/{id}")
    void delete(@PathVariable String shop,
                @PathVariable(required = true) Long id) {

        apiBouncer.delete(root + shop + "/" + id);
    }

}//:)

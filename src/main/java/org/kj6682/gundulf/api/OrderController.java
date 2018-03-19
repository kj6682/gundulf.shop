package org.kj6682.gundulf.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @GetMapping("/shop/{shop}")
    ResponseEntity<String> shopOrders(@PathVariable String shop) {

        return orderService.shopOrders(shop);

    }

    /**
     *
     * the_shop_holder_list_the_products_to_place_orders
     *
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



    @PostMapping(value = "/shop/{shop}")
    ResponseEntity<?> create(@PathVariable String shop,
                             @RequestBody String order) {

        return orderService.create(shop, order);

    }

    @PutMapping(value = "/shop/{shop}/{id}")
    ResponseEntity<?> update(@PathVariable String shop,
                                  @PathVariable String id,
                                  @RequestBody String order) {

        return orderService.update( shop , id, order);

    }

    @DeleteMapping(value = "/shop/{shop}/{id}")
    void delete(@PathVariable String shop,
                @PathVariable(required = true) Long id) {

        orderService.delete( shop, id);
    }

}//:)
package gundulf.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
class OrderController {


    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_ORDERS}")
    private String root;

    private String orders = "/api/orders";

    /**
     * ORDER-001 - the_producer_lists_the_orders
     * <p>
     * as a producer
     * I want to list all my order lines
     * so that I can facilitate dispatching the products
     */
    @GetMapping("/producer/{producer}")
    ResponseEntity<String> producerOrders(@PathVariable String producer) {

        return apiBouncer.get(root + orders + "/producer/" + producer);

    }

    /**
     * ORDER-002 - the_producer_lists_the_daily_todo
     * <p>
     * as a producer
     * I want to get my todolist
     * so that I can facilitate my daily work
     * and possibly anticipate the future productions
     */
    @GetMapping("/producer/{producer}/todo")
    ResponseEntity<String> producerTodos(@PathVariable String producer) {

        return apiBouncer.get(root + orders + "/producer/" + producer + "/todo");

    }

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

        return apiBouncer.get(root + orders + "/shop/" + shop);

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
    ResponseEntity<String> dailyOrders(@PathVariable String shop,
                                            @PathVariable String producer) {

        return apiBouncer.get(root + orders + "/shop/" + shop + "/products/" + producer);
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

        return apiBouncer.post(root + orders + "/shop/" + shop, order);

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

        return apiBouncer.put(root + orders + "/shop/" + shop + "/" + id, order);

    }

    @DeleteMapping(value = "/shop/{shop}/{id}")
    void delete(@PathVariable String shop,
                @PathVariable(required = true) Long id) {

        apiBouncer.delete(root + orders + "/shop/" + shop + "/" + id);
    }
}//:)

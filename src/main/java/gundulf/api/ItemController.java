package gundulf.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
class ItemController {

    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_ITEMS}")
    private String root;

    private String items = "/api/items";


    @GetMapping("/items")
    ResponseEntity<String> list(@RequestParam(value = "page", defaultValue = "0") int page,
                                @RequestParam(value = "size", defaultValue = "0") int size){

        return apiBouncer.get(root + items);

    }

    @GetMapping("/items/search")
    ResponseEntity<String>  search(@RequestParam(value = "name", defaultValue = "") String name) {

        return apiBouncer.get(root + items + "/search?name=" + name);
    }

    @PostMapping(value = "/items")
    ResponseEntity<?> create(@RequestBody String item) {

        return apiBouncer.post(root +items, item);

    }



    @DeleteMapping(value = "/items/{id}")
    void delete(@PathVariable(required = true) Long id) {

        apiBouncer.delete(items + "/" + id);
    }


}//:)

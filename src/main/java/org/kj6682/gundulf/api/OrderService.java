package org.kj6682.gundulf.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private RestTemplate restTemplate;

    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_ORDERS}")
    private String root;

    ResponseEntity<String> shopOrders(String shop) {

        return apiBouncer.get(root + shop);

    }

    ResponseEntity<?> create(@PathVariable String shop,
                             @RequestBody String order) {

        return apiBouncer.post(root + shop, order);

    }

    ResponseEntity<?> update(@PathVariable String shop,
                             @PathVariable String id,
                             @RequestBody String order) {

        return apiBouncer.put(root + shop + "/" + id, order);

    }

    void delete(@PathVariable String shop,
                @PathVariable(required = true) Long id) {

        apiBouncer.delete(root + shop + "/" + id);
    }

    Map<String, OrderLine> mapOrderLines(String shop, String producer) {

        final String restEndPointUrl = root + shop + "/" + producer + "/" + LocalDate.now().plusDays(1);;

        OrderLine[] forNow = restTemplate.getForObject(restEndPointUrl, OrderLine[].class);
        List<OrderLine> result = Arrays.asList(forNow);
        return result.stream()
                .collect(Collectors
                        .toMap(OrderLine::getDeadLineAndProduct, o -> o));
    }
}

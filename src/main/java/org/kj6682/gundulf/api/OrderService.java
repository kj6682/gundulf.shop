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

    private String orderlines_root = "/api/orderlines/shop";

    ResponseEntity<String> shopOrders(String shop) {

        return apiBouncer.get(String.format("%s/%s", root + orderlines_root, shop));

    }

    ResponseEntity<?> create(String shop, String order) {

        return apiBouncer.post(String.format("%s/%s", root + orderlines_root, shop), order);

    }

    ResponseEntity<?> update(String shop, String id, String order) {

        return apiBouncer.put(String.format("%s/%s/%s", root + orderlines_root, shop, id), order);

    }

    ResponseEntity<?> delete(String shop, Long id) {

        return apiBouncer.delete(String.format("%s/%s/%s", root + orderlines_root, shop, id));
    }

    Map<String, OrderLine> mapOrderLines(String shop, String producer) {

        final String restEndPointUrl = String.format("%s/%s/%s/%s", root + orderlines_root, shop, producer, LocalDate.now().plusDays(1).toString());

        OrderLine[] forNow = restTemplate.getForObject(restEndPointUrl, OrderLine[].class);

        List<OrderLine> result = Arrays.asList(forNow);
        return result.stream()
                .collect(Collectors
                        .toMap(OrderLine::getDeadLineAndProduct, o -> o));
    }
}

package gundulf.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${API_ORDERS}")
    private String root;

    Map<String, OrderLine> mapOrderLines(String shop, String producer) {
        final String restEndPointUrl = root + shop + "/products/" + producer;
        OrderLine[] forNow = restTemplate.getForObject(restEndPointUrl, OrderLine[].class);
        List<OrderLine> result = Arrays.asList(forNow);
        return result.stream()
                .collect(Collectors
                        .toMap(OrderLine::getDeadLineAndProduct, o -> o));
    }
}

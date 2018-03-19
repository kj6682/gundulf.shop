package org.kj6682.gundulf.api;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.deser.std.StdDeserializer;
import com.fasterxml.jackson.databind.module.SimpleModule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    ApiBouncer apiBouncer;

    @Value("${API_PRODUCTS}")
    private String root;


     Map<String, OrderLine> mapProductLines(String shop, String producer) {

        SimpleModule module = new SimpleModule(ProductDeserializer.class.getName(), new Version(1, 0, 0, null, null, null));
        ProductDeserializer productDeserializer = new ProductDeserializer();
        productDeserializer.setShop(shop);
        module.addDeserializer(OrderLine.class, productDeserializer);

        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        objectMapper.registerModule(module);

        String jsonProds = apiBouncer.get(String.format("%s/%s",root, producer)).getBody();

        Map<String, OrderLine> result;
        try{
            List<OrderLine> productLines = objectMapper.readValue(jsonProds, new TypeReference<List<OrderLine>>() {});

            result = productLines.stream()
                    .collect(Collectors
                            .toMap(OrderLine::getDeadLineAndProduct, o -> o));

        }catch (IOException e){
            result = new HashMap<>();
            e.printStackTrace();
        }

        return result;
    }

    static class ProductDeserializer extends StdDeserializer<OrderLine> {

        String shop;

        public ProductDeserializer() {
            this(null);
        }

        public ProductDeserializer(Class<?> vc) {
            super(vc);
        }

        void setShop(String shop) {
            this.shop = shop;
        }

        @Override
        public OrderLine deserialize(JsonParser parser, DeserializationContext deserializer) throws IOException {
            OrderLine order = new OrderLine();
            ObjectCodec codec = parser.getCodec();
            JsonNode node = codec.readTree(parser);

            // try catch block
            order.setId(0L);

            JsonNode jProduct = node.get("name");
            String product = jProduct.asText();

            JsonNode jPieces = node.get("pieces");
            Integer pieces = jPieces.asInt();
            order.setProduct(product + "-" + pieces);

            JsonNode jProducer = node.get("producer");
            String producer = jProducer.asText();
            order.setProducer(producer);

            order.setShop(shop);
            order.setQuantity(0);
            order.setStatus("NEW");
            order.setCreated(LocalDate.now());
            order.setDeadline(LocalDate.now().plusDays(1L));
            return order;
        }
    }//:)
}

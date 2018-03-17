package gundulf;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashSet;
import java.util.Set;

@Profile({"heroku"})
@Component
public class ProdCorsFilter implements Filter {

    private final Logger log = LoggerFactory.getLogger(ProdCorsFilter.class);


    @Override
    public void doFilter(ServletRequest req, ServletResponse res, FilterChain chain) throws IOException, ServletException {


        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;

        String[] allowDomain = {"http://gundulf-chef.herokuapp.com", "https://gundulf-chef.herokuapp.com"};
        Set<String> allowedOrigins = new HashSet<>(Arrays.asList(allowDomain));
        String originHeader = request.getHeader("Origin");

        if (allowedOrigins.contains(originHeader)) {
            //response.setHeader("Access-Control-Allow-Origin", "*");
            response.setHeader("Access-Control-Allow-Origin", request.getHeader("Origin"));
            //response.setHeader("Access-Control-Allow-Origin", "https://gundulf-chef.herokuapp.com");
            response.setHeader("Access-Control-Allow-Credentials", "true");
            response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT");
            response.setHeader("Access-Control-Max-Age", "3600");
            response.setHeader("Access-Control-Allow-Headers",
                               "Content-Type, Accept, X-Requested-With, remember-me");
        }
        chain.doFilter(req, res);


    }

    private void debug(HttpServletRequest request) {
        System.out.println(request.getHeader("Origin"));

        Enumeration<String> headerNames = request.getHeaderNames();

        if (headerNames != null) {
            while (headerNames.hasMoreElements()) {
                String name = headerNames.nextElement();
                System.out.println("Header: " + name + " : " + request.getHeader(name));
            }
        }
    }

    @Override
    public void init(FilterConfig filterConfig) {
    }

    @Override
    public void destroy() {
    }

}

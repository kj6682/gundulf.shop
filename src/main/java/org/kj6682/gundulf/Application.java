package org.kj6682.gundulf;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
@Controller
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Value("${API_ROOT}")
    private String root;

    @RequestMapping("/")
    public String root(Model model) {
        return "index";
    }

    @RequestMapping("/paris")
    public String paris(Model model) {
        return getModel(SHOP.PARIS, model);
    }

    @RequestMapping("/luxembourg")
    public String luxembourg(Model model) {
        return getModel(SHOP.LUXEMBOURG, model);
    }


    private String getModel(SHOP shop, Model model) {
        model.addAttribute("shop", shop.name);
        model.addAttribute("root", root);
        return "shop/index";
    }


    private enum SHOP {
        PARIS("paris"), LUXEMBOURG("luxembourg");

        private String name;

        SHOP(String name) {
            this.name = name;
        }

        String getName() {
            return this.name;
        }
    }
}
package com.scootshare.base.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class HomepageController {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }
}

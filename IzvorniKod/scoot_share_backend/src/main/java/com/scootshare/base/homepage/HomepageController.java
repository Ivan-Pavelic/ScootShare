package com.scootshare.base.homepage;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomepageController {

    @GetMapping(value = "/")
    public String index() {
        return null;
    }
}

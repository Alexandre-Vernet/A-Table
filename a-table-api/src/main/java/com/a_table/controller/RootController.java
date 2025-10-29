package com.a_table.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController("/")
public class RootController {

    @GetMapping("/")
    public String root() {
        return "A-Table API is running";
    }
}

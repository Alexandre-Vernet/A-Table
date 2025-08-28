package com.a_table.controller;

import com.a_table.service.DemoService;
import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/demo")
public class DemoController {

    @Resource
    DemoService demoService;

    @GetMapping("/")
    String getExercises() {
       return demoService.getExercises();
    }
}

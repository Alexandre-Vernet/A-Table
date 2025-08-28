package com.a_table.service;

import com.a_table.utils.Cast;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

@Service
public class DemoService {

    @Resource
    Cast cast;


    public String getExercises() {
        return "Hello World";
    }
}

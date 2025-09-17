package com.a_table.utils;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@AllArgsConstructor
@Component
public class MappingService {

    private final ModelMapper modelMapper;

    public <T, D> D map(T data, Class<D> clazz) {
        return modelMapper.map(data, clazz);
    }
}

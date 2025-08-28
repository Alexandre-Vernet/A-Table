package com.a_table.utils;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class Cast {

    private final ModelMapper modelMapper;

    public Cast(ModelMapper modelMapper) {
        this.modelMapper = modelMapper;
    }

    public <T, D> D castToDto(T data, Class<D> clazz) {
        return modelMapper.map(data, clazz);
    }

    public <T, D> List<D> castToDtoList(List<T> data, Class<D> clazz) {
        return data.stream()
                .map(d -> modelMapper.map(d, clazz))
                .toList();
    }
}

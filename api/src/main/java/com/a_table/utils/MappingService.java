package com.a_table.utils;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

import java.util.List;

@AllArgsConstructor
@Component
public class MappingService {

    private final ModelMapper modelMapper;

    public <T, D> D map(T data, Class<D> clazz) {
        return modelMapper.map(data, clazz);
    }

    public <T, D> void merge(T source, D destination) {
        modelMapper.map(source, destination);
    }

    public <T, D> List<D> convertListTo(List<T> data, Class<D> clazz) {
        return data.stream()
                .map(d -> modelMapper.map(d, clazz))
                .toList();
    }
}

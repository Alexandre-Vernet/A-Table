package com.a_table.config;

import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean  // <-- Cela déclare ModelMapper comme un bean géré par Spring
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();

        // Configuration optionnelle (ex: ignorer certains champs)
        // modelMapper.getConfiguration().setSkipNullEnabled(true);

        return modelMapper;
    }
}

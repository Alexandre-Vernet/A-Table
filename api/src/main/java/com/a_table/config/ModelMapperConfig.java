package com.a_table.config;

import org.hibernate.proxy.HibernateProxy;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper mapper = new ModelMapper();
        mapper.getConfiguration()
                .setSkipNullEnabled(true)
                .setCollectionsMergeEnabled(true)
                .setAmbiguityIgnored(true)
                .setPropertyCondition(context ->  !(context.getSource() instanceof HibernateProxy) && context.getSource() != null);
        return mapper;
    }
}

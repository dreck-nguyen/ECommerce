package com.ecommerce.springboot.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfiguration {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{

        //protect end point /api/orders

        System.out.println("reached 1");
        AntPathRequestMatcher  securityURl = new AntPathRequestMatcher("/api/orders/**");

        http.authorizeHttpRequests(configurer->
                        configurer
                                .requestMatchers(securityURl)
                                .authenticated()
                                .anyRequest().permitAll())
                .oauth2ResourceServer()
                .jwt();

        http.cors();

        //add content negotiation strategy

        http.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        //force a non-empty response body for 401's to make the response user friendly

        Okta.configureResourceServer401ResponseBody(http);

        System.out.println("reached 2");

        //disable CSRF
        http.csrf().disable();

        return http.build();
    }
}

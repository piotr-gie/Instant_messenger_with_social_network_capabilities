package com.example.socialapp;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class SocialAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(SocialAppApplication.class, args);
	}




	
}

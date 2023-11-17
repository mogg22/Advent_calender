package com.likelion.totree;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
@EnableCaching
public class TotreeApplication {

	public static void main(String[] args) {
		SpringApplication.run(TotreeApplication.class, args);
	}

}

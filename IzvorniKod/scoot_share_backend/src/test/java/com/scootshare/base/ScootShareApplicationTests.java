package com.scootshare.base;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class ScootShareApplicationTests {

	
	@Autowired
	private PasswordEncoder encoder;
	
	@Test
	public void getAdminPasswordEncoded() {
		System.out.println(encoder.encode("scootShareAdmin"));
	}
	
	@Test
	void contextLoads() {
	}

}

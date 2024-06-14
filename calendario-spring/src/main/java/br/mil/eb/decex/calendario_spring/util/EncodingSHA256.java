package br.mil.eb.decex.calendario_spring.util;

import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;

/**
 * Critografia de senha do usuario. 
 * 
 * @author <b>Vanilton</b> Gomes dos Santos - 2º Sgt QE
 * @version 1.0
 */
public final class EncodingSHA256 {

	private EncodingSHA256() {
		
	}

	/**
	 * Criptografia SHA-256 Base64
	 * @param password senha a ser criptografada
	 * @return senha criptografada
	 */
	public static String encodingBase64(String password) {
		
		String encoding = null;
		
		try {
			
			MessageDigest md = MessageDigest.getInstance("SHA-256");
			md.update(password.getBytes());
			encoding = Base64.getEncoder().encodeToString(md.digest());			
			
		}catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e.getMessage());
		}		
		
		return encoding;
	}
	
}
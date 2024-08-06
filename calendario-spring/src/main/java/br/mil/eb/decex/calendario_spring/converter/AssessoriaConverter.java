package br.mil.eb.decex.calendario_spring.converter;

import org.springframework.core.convert.converter.Converter;

import br.mil.eb.decex.calendario_spring.modelo.Assessoria;
import io.micrometer.common.util.StringUtils;

public class AssessoriaConverter implements Converter<String, Assessoria>{

    @Override
	public Assessoria convert(@SuppressWarnings("null") String id) {
		if (!StringUtils.isEmpty(id)) {
			Assessoria asse = new Assessoria();
			asse.setId(Long.valueOf(id));
			return asse;
		}
		
		return null;
    
}

}

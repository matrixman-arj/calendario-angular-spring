package br.mil.eb.decex.calendario_spring.enumerado.converters;

import java.util.stream.Stream;

import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PostoGraduacaoConverter implements AttributeConverter<PostoGraduacao, String> {

    @Override
    public String convertToDatabaseColumn(PostoGraduacao attribute) {
        if (attribute == null) {
            return null;
        }
        return attribute.getValue();
    }

    @Override
    public PostoGraduacao convertToEntityAttribute(String dbData) {
        if (dbData == null) {
            return null;
        }

        for (PostoGraduacao posto : PostoGraduacao.values()) {
            if (posto.getValue().equals(dbData)) {
                return posto;
            }
        }

        throw new IllegalArgumentException("Unknown value: " + dbData);
    }
}
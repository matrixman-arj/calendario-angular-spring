package br.mil.eb.decex.calendario_spring.enumerado.converters;

import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PostoGraduacaoConverter implements AttributeConverter<PostoGraduacao, String> {

    @Override
    public String convertToDatabaseColumn(PostoGraduacao postoGraduacao) {
        if (postoGraduacao == null) {
            return null;
        }
        return postoGraduacao.getValue();
    }

    @Override
    public PostoGraduacao convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
        }

        for (PostoGraduacao posto : PostoGraduacao.values()) {
            if (posto.getValue().equals(value)) {
                return posto;
            }
        }

        throw new IllegalArgumentException("Unknown value: " + value);
    }
}
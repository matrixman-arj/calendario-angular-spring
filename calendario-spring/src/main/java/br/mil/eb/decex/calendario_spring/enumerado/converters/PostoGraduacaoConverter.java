<<<<<<< HEAD
package br.mil.eb.decex.calendario_spring.enumerado.converters;

import java.util.stream.Stream;

import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PostoGraduacaoConverter implements AttributeConverter<PostoGraduacao, String>{

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
            return Stream.of(PostoGraduacao.values())
                    .filter(postGradu -> postGradu.getValue().equals(value) )
                    .findFirst()
                    .orElseThrow(IllegalArgumentException :: new);
    }

}
=======
package br.mil.eb.decex.calendario_spring.enumerado.converters;

import java.util.stream.Stream;

import br.mil.eb.decex.calendario_spring.enumerado.PostoGraduacao;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class PostoGraduacaoConverter implements AttributeConverter<PostoGraduacao, String>{

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
            return Stream.of(PostoGraduacao.values())
                    .filter(postGradu -> postGradu.getValue().equals(value) )
                    .findFirst()
                    .orElseThrow(IllegalArgumentException :: new);
    }

}
>>>>>>> 43d93e8084e9d3d4c74280469e93fe6b369d86f7

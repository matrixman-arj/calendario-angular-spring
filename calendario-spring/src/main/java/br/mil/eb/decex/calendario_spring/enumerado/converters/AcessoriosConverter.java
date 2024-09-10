package br.mil.eb.decex.calendario_spring.enumerado.converters;

import java.util.stream.Stream;

import br.mil.eb.decex.calendario_spring.enumerado.Acessorios;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class AcessoriosConverter implements AttributeConverter<Acessorios, String> {

    @Override
    public String convertToDatabaseColumn(Acessorios acessorios) {
       if (acessorios == null) {
        return null;
       }
        return acessorios.getValue();
    }

    @Override
    public Acessorios convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
           }
            return Stream.of(Acessorios.values())
                    .filter(acessorios -> acessorios.getValue().equals(value) )
                    .findFirst()
                    .orElseThrow(IllegalArgumentException :: new);
    }

   
}

    
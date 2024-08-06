<<<<<<< HEAD
package br.mil.eb.decex.calendario_spring.enumerado.converters;

import java.util.stream.Stream;


import br.mil.eb.decex.calendario_spring.enumerado.TipoAcesso;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TipoAcessoConverter implements AttributeConverter<TipoAcesso, String> {

    @Override
    public String convertToDatabaseColumn(TipoAcesso tipoAcesso) {
       if (tipoAcesso == null) {
        return null;
       }
        return tipoAcesso.getValue();
    }

    @Override
    public TipoAcesso convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
           }
            return Stream.of(TipoAcesso.values())
                    .filter(tipAcesso -> tipAcesso.getValue().equals(value) )
                    .findFirst()
                    .orElseThrow(IllegalArgumentException :: new);
    }

   
}

=======
package br.mil.eb.decex.calendario_spring.enumerado.converters;

import java.util.stream.Stream;


import br.mil.eb.decex.calendario_spring.enumerado.TipoAcesso;
import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class TipoAcessoConverter implements AttributeConverter<TipoAcesso, String> {

    @Override
    public String convertToDatabaseColumn(TipoAcesso tipoAcesso) {
       if (tipoAcesso == null) {
        return null;
       }
        return tipoAcesso.getValue();
    }

    @Override
    public TipoAcesso convertToEntityAttribute(String value) {
        if (value == null) {
            return null;
           }
            return Stream.of(TipoAcesso.values())
                    .filter(tipAcesso -> tipAcesso.getValue().equals(value) )
                    .findFirst()
                    .orElseThrow(IllegalArgumentException :: new);
    }

   
}

>>>>>>> 43d93e8084e9d3d4c74280469e93fe6b369d86f7
    
package br.mil.eb.decex.calendario_spring.enumerado;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum PostoGraduacao {

    GEN_EXERCITO("Gen Ex", 1),
	GEN_DIVISAO("Gen Div", 2),
	GEN_BRIGADA("Gen Bda", 3),
	CORONEL("Cel", 4),
	TEN_CORONEL("Ten Cel", 5),
	MAJOR("Maj", 6),
	CAPITAO("Cap", 7),
	PRI_TENENTE("1º Ten", 8),
	SEG_TENENTE("2º Ten", 9),
	ASP("Asp", 10),
	SUBTENENTE("ST", 11),
	PRI_SARGENTO("1º SGT", 12),
	SEG_SARGENTO("2º SGT", 13),
	TER_SARGENTO("3º SGT", 14),
	CABO("Cabo", 15),
	SOLDADO("Soldado", 16),
	FUNC_CIV("Funcionário Civil", 17);
	
	private String value;
    private int ordem;

    private PostoGraduacao(String value, int ordem) {
        this.value = value;
        this.ordem = ordem;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    public int getOrdem() {
        return ordem;
    }

    @JsonCreator
    public static PostoGraduacao fromValue(String value) {
        for (PostoGraduacao posto : PostoGraduacao.values()) {
            if (posto.getValue().equalsIgnoreCase(value)) {
                return posto;
            }
        }
        throw new IllegalArgumentException("Unknown enum value: " + value);
    }

    @Override
    public String toString() {        
        return value;
    }
	
}

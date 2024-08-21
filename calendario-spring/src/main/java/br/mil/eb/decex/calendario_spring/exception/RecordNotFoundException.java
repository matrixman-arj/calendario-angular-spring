package br.mil.eb.decex.calendario_spring.exception;

public class RecordNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 1L;

    public RecordNotFoundException(Long id) {
        super("Registro não encontrada com o id: " + id);
    }
}

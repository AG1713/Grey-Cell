package exceptions;

public class RecallBayUnavailableException extends RuntimeException{
    public RecallBayUnavailableException(String message, Throwable cause) {
        super(message, cause);
    }

    public RecallBayUnavailableException(String message) {
        super(message);
    }
}

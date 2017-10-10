package com.xgjk.common.lib.exception;

/**
 * Created by shangwf on 2017/8/29.
 */

public class ReflectException extends RuntimeException {

    private static final long serialVersionUID = -6654702552823551870L;

    public ReflectException(String message) {
        super(message);
    }

    public ReflectException(String message, Throwable cause) {
        super(message, cause);
    }

    public ReflectException() {
        super();
    }

    public ReflectException(Throwable cause) {
        super(cause);
    }
}

package com.a_table.exception;

public class ImageConvertException extends RuntimeException {

    public ImageConvertException() {
        super("Impossible d'enregistrer l'image");
    }
}

package com.a_table.exception;

import org.springframework.http.HttpStatus;

public class ImageConvertException extends ApiException {

    public ImageConvertException() {
        super("ERROR_CONVERT_IMAGE", "Impossible d'enregistrer l'image", HttpStatus.BAD_REQUEST);
    }
}

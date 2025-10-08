package com.a_table.utils;

public class StringUtils {

    public static String removeAccents(String input) {
        return java.text.Normalizer.normalize(input, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
    }
}

package com.a_table.utils;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;

public class ImageUtils {

    public static byte[] convertPngToJpeg(byte[] pngBytes) {
        try {
            BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(pngBytes));

            BufferedImage rgbImage = new BufferedImage(
                    bufferedImage.getWidth(),
                    bufferedImage.getHeight(),
                    BufferedImage.TYPE_INT_RGB
            );
            rgbImage.getGraphics().drawImage(bufferedImage, 0, 0, null);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();

            // Écriture en JPEG
            ImageIO.write(rgbImage, "jpg", baos);

            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Erreur conversion PNG -> JPEG", e);
        }
    }
}
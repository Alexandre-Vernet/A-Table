package com.a_table.utils;

import com.a_table.exception.ImageConvertException;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.util.Base64;

public class ImageUtils {

    public static byte[] convertPngToJpeg(String image) {
        try {
            String base64Image = image.split(",")[1];
            byte[] imageBytes = Base64.getDecoder().decode(base64Image);
            BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(imageBytes));
            if (bufferedImage == null) {
                throw new ImageConvertException();
            }

            BufferedImage rgbImage = new BufferedImage(
                    bufferedImage.getWidth(),
                    bufferedImage.getHeight(),
                    BufferedImage.TYPE_INT_RGB
            );
            rgbImage.getGraphics().drawImage(bufferedImage, 0, 0, null);

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ImageIO.write(rgbImage, "jpg", baos);

            return baos.toByteArray();
        } catch (Exception e) {
            throw new ImageConvertException();
        }
    }
}
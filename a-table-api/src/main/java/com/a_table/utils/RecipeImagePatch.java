package com.a_table.utils;

import com.a_table.model.RecipeEntity;
import com.a_table.repository.RecipeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.util.List;

@Component
public class RecipeImagePatch implements CommandLineRunner {

    private final RecipeRepository recipeRepository;

    public RecipeImagePatch(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        System.out.println("Démarrage de la migration des images...");

        List<RecipeEntity> recipes = recipeRepository.findAll();
        for (RecipeEntity r : recipes) {
            if (r.getImage() != null) {
                try {
                    BufferedImage img = ImageIO.read(new ByteArrayInputStream(r.getImage()));
                    if (img == null) {
                        System.out.println("Image non lisible id=" + r.getId());
                    }
                } catch (Exception e) {
                    System.out.println("Erreur image id=" + r.getId() + ": " + e.getMessage());
                }
            }
        }


        System.out.println("Migration des images terminée !");
    }
}

package com.a_table.utils;

import com.a_table.model.RecipeEntity;
import com.a_table.repository.RecipeRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Component
public class RecipeImagePatch implements CommandLineRunner {

    private final RecipeRepository recipeRepository;

    public RecipeImagePatch(RecipeRepository recipeRepository) {
        this.recipeRepository = recipeRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        System.out.println("Démarrage de la migration des images...");

        List<RecipeEntity> recipes = recipeRepository.findAll();

        for (RecipeEntity recipe : recipes) {
            byte[] imageBytes = recipe.getImage();
            if (imageBytes != null) {
                // Convert PNG -> JPEG
                byte[] jpegBytes = ImageUtils.convertPngToJpeg(imageBytes);

                // Mettre à jour l'image en base
                recipe.setImage(jpegBytes);
            }
        }

        recipeRepository.saveAll(recipes);
        System.out.println("Migration des images terminée !");
    }
}

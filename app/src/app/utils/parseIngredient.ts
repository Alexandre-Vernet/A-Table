import { Ingredient } from '../dto/Ingredient';

export const parseIngredient = (ingredientString: string): Ingredient => {
    const trimmed = ingredientString.trim();
    if (!trimmed) {
        return null;
    }

    // Vérifier d'abord si c'est un ingrédient sans quantité (ex: "Sel")
    if (/^[a-zA-Zàâäéèêëîïôöùûüçÿœæ\s]+$/.test(trimmed)) {
        return {
            name: trimmed,
            quantity: null,
            unit: null
        };
    }

    // Vérifier si c'est une quantité entière sans unité (ex: "Oeuf 2")
    const simpleQuantityMatch = trimmed.match(/^([a-zA-Zàâäéèêëîïôöùûüçÿœæ\s]+)\s(\d+)$/i);
    if (simpleQuantityMatch) {
        return {
            name: simpleQuantityMatch[1].trim(),
            quantity: Number(simpleQuantityMatch[2].trim()),
            unit: null
        };
    }

    // Préparer les unités pour la regex (même liste que votre validateur)
    const ALLOWED_UNITS = [
        'g', 'kg', 'mg',
        'L', 'mL', 'cL', 'dL',
        'sachet', 'sachets',
        'cuillère à café', 'cuillère à soupe', 'cuillères à café', 'cuillères à soupe',
        'verre', 'verres',
        'pièce', 'pièces',
        'pincée', 'pincées',
        'branche', 'branches',
        'boîte', 'boîtes',
        'brique', 'briques',
        'unité', 'unités',
        'tranche', 'tranches',
        'gousse', 'gousses',
        'feuille', 'feuilles',
        'botte', 'bottes',
        'c\\. à café', 'c\\. à soupe', 'c à café', 'c à soupe'
    ];

    const escapedUnits = ALLOWED_UNITS
        .map(unit => unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .sort((a, b) => b.length - a.length) // Trier par longueur décroissante
        .join('|');

    // Regex pour extraire nom, quantité et unité
    const pattern = new RegExp(
        `^([a-zA-Zàâäéèêëîïôöùûüçÿœæ\\s]+)` + // Nom (groupe 1)
        `\\s` +
        `((?:\\d+\\/\\d+)|(?:\\d+(?:\\.\\d+)?))` + // Quantité (groupe 2)
        `\\s(` + escapedUnits + `)` + // Unité (groupe 3)
        `$`,
        'i'
    );

    const match = trimmed.match(pattern);

    if (match) {
        const name = match[1].trim();
        const quantity = Number(match[2].trim());
        const unit = match[3].trim();

        return { name: name, quantity, unit };
    }

    // Si aucun pattern ne match, retourner tout dans le nom
    return {
        name: trimmed,
        quantity: null,
        unit: null
    };
}

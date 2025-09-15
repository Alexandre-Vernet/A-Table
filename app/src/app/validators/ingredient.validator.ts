import { AbstractControl, ValidatorFn } from '@angular/forms';

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
    'c. à café', 'c. à soupe', 'c à café', 'c à soupe'
];

export function ingredientValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        if (!control.value) {
            return null;
        }

        const value = control.value.trim();

        // Cas 1: Ingrédient sans quantité (ex: "Sel")
        if (/^[a-zA-Zàâäéèêëîïôöùûüçÿœæ\s]+$/.test(value)) {
            return { missingQuantity: { value } };
        }

        // Cas 2: Quantité entière sans unité (ex: "Oeuf 2")
        if (/^[a-zA-Zàâäéèêëîïôöùûüçÿœæ\s]+\s\d+$/.test(value)) {
            return null;
        }

        // Préparation des unités pour la regex
        const escapedUnits = ALLOWED_UNITS
            .map(unit => unit.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
            .sort((a, b) => b.length - a.length) // Trier par longueur décroissante pour éviter les conflits
            .join('|');

        // Cas 3: Avec unité (obligatoire pour fractions/décimaux)
        const unitPattern = new RegExp(
            `^([a-zA-Zàâäéèêëîïôöùûüçÿœæ\\s]+)` + // Nom de l'ingrédient
            `\\s` +
            `(?:` +
            `(?:\\d+\\/\\d+)` + // Fraction (ex: 1/2)
            `|` +
            `\\d+(?:\\.\\d+)?` + // Nombre décimal (ex: 1.5)
            `)` +
            `\\s(` + escapedUnits + `)` + // Unité autorisée
            `$`, // Fin stricte - rien n'est autorisé après l'unité
            'i' // Flag insensitive
        );

        if (unitPattern.test(value)) {
            return null;
        }

        // Cas 4: Format invalide
        return {
            invalidFormat: {
                value,
                requiredPattern: 'Format attendu: "Nom quantité [unité]"',
                allowedUnits: ALLOWED_UNITS,
                examples: [
                    'Farine 150 g',
                    'Sucre vanillé 1/2 sachet',
                    'Lait 1.5 L',
                    'Oeuf 2',
                    'Persil 1 botte',
                    'Café 1 cuillère à café',
                    'Cannelle 1 c. à café'
                ],
                error: 'Aucun texte n\'est autorisé après l\'unité de mesure'
            }
        };
    };
}

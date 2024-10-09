<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Category",
 *     title="Category",
 *     description="Modèle de catégorie",
 *     required={"name"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID unique de la catégorie",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Nom de la catégorie",
 *         example="Sports"
 *     ),
 *     @OA\Property(
 *         property="history",
 *         type="string",
 *         description="Historique de la catégorie",
 *         example="L'histoire des événements sportifs remonte à plusieurs siècles."
 *     ),
 *     @OA\Property(
 *         property="rules",
 *         type="string",
 *         description="Règles applicables à la catégorie",
 *         example="Les événements doivent respecter les normes de sécurité sportive."
 *     ),
 *     @OA\Property(
 *         property="images",
 *         type="string",
 *         description="Chemin vers les images associées à la catégorie",
 *         example="images/sports.jpg"
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="Date de création de la catégorie"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="Date de mise à jour de la catégorie"
 *     ),
 *
 * )
 */
class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "history",
        "rules",
        "images"
    ];

    // Relation entre les événements et les catégories
    public function events()
    {
        return $this->hasMany(Event::class);
    }
}

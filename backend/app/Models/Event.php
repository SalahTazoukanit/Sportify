<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @OA\Schema(
 *     schema="Event",
 *     required={"user_id", "category_id", "name", "description", "date", "position", "aviable_places", "time", "status"},
 *     @OA\Property(property="id", type="integer", description="ID de l'événement"),
 *     @OA\Property(property="user_id", type="integer", description="ID de l'utilisateur qui a créé l'événement"),
 *     @OA\Property(property="category_id", type="integer", description="ID de la catégorie à laquelle l'événement appartient"),
 *     @OA\Property(property="name", type="string", description="Nom de l'événement"),
 *     @OA\Property(property="description", type="text", description="Description de l'événement"),
 *     @OA\Property(property="date", type="string", format="date", description="Date de l'événement"),
 *     @OA\Property(property="time", type="string", format="time", description="Heure de l'événement"),
 *     @OA\Property(property="position", type="string", description="Localisation de l'événement"),
 *     @OA\Property(property="aviable_places", type="integer", description="Nombre de places disponibles pour l'événement"),
 *     @OA\Property(property="image", type="string", format="binary", description="Image de l'événement"),
 *     @OA\Property(property="status", type="string", description="Statut de l'événement (e.g., pending, published)"),
 *     @OA\Property(property="category", ref="#/components/schemas/Category", description="La catégorie à laquelle cet événement est lié"),
 *     @OA\Property(property="user", ref="#/components/schemas/User", description="L'utilisateur qui a créé l'événement"),
 *     @OA\Property(property="participants", type="array", @OA\Items(ref="#/components/schemas/User"), description="Liste des participants inscrits à l'événement"),
 *     @OA\Property(property="usersFavourites", type="array", @OA\Items(ref="#/components/schemas/User"), description="Liste des utilisateurs ayant cet événement comme favori")
 * )
 */
class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'category_id',
        'name',
        'description',
        'date',
        'position',
        'aviable_places',
        'image',
        'time',
        'status'
    ];

    /**
     * @OA\Property(
     *     property="category",
     *     ref="#/components/schemas/Category"
     * )
     */
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * @OA\Property(
     *     property="user",
     *     ref="#/components/schemas/User"
     * )
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Relation entre utilisateurs et événements pour la table pivot `user_event` (participants).
     *
     * @OA\Property(
     *     property="participants",
     *     type="array",
     *     @OA\Items(ref="#/components/schemas/User"),
     *     description="Liste des utilisateurs qui participent à l'événement"
     * )
     */
    public function participants()
    {
        return $this->belongsToMany(User::class);
    }

    /**
     * Relation pour définir la table pivot `user_favourite` (événements favoris des utilisateurs).
     *
     * @OA\Property(
     *     property="usersFavourites",
     *     type="array",
     *     @OA\Items(ref="#/components/schemas/User"),
     *     description="Liste des utilisateurs qui ont ajouté cet événement en favori"
     * )
     */
    public function usersFavourites()
    {
        return $this->belongsToMany(User::class, 'user_favourite');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Laravel\Jetstream\HasProfilePhoto;
use Laravel\Sanctum\HasApiTokens;

/**
 * @OA\Schema(
 *     schema="User",
 *     title="User",
 *     description="Modèle de l'utilisateur",
 *     required={"name", "email", "password"},
 *     @OA\Property(
 *         property="id",
 *         type="integer",
 *         description="ID unique de l'utilisateur",
 *         example=1
 *     ),
 *     @OA\Property(
 *         property="name",
 *         type="string",
 *         description="Nom de l'utilisateur",
 *         example="John Doe"
 *     ),
 *     @OA\Property(
 *         property="email",
 *         type="string",
 *         format="email",
 *         description="Adresse email de l'utilisateur",
 *         example="john@example.com"
 *     ),
 *     @OA\Property(
 *         property="password",
 *         type="string",
 *         description="Mot de passe de l'utilisateur",
 *         example="password123"
 *     ),
 *     @OA\Property(
 *         property="role",
 *         type="string",
 *         description="Rôle de l'utilisateur",
 *         example="admin"
 *     ),
 *     @OA\Property(
 *         property="image_profile",
 *         type="string",
 *         description="Chemin vers l'image de profil de l'utilisateur",
 *         example="/images/profile.jpg"
 *     ),
 *     @OA\Property(
 *         property="created_at",
 *         type="string",
 *         format="date-time",
 *         description="Date de création de l'utilisateur"
 *     ),
 *     @OA\Property(
 *         property="updated_at",
 *         type="string",
 *         format="date-time",
 *         description="Date de mise à jour de l'utilisateur"
 *     ),
 * )
 */
class User extends Authenticatable
{
    use HasApiTokens;
    use HasFactory;
    use HasProfilePhoto;
    use Notifiable;
    use TwoFactorAuthenticatable;

    /**
     * Les attributs pouvant être assignés en masse.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'image_profile'
    ];

    /**
     * Relation entre les utilisateurs et les événements.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function events()
    {
        return $this->belongsToMany(Event::class);
    }

    /**
     * Relation définissant la table pivot user_favourite.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function eventsFavourites()
    {
        return $this->belongsToMany(Event::class, 'user_favourite');
    }

    /**
     * Les attributs à cacher lors de la sérialisation.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'two_factor_recovery_codes',
        'two_factor_secret',
    ];

    /**
     * Les accessors à ajouter à la forme de tableau du modèle.
     *
     * @var array<int, string>
     */
    protected $appends = [
        'profile_photo_url',
    ];

    /**
     * Obtenir les attributs qui doivent être castés.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}

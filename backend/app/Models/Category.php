<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "history",
        "sport_rules",
        "images"
    ];

    // Relation between event and category ;
    public function events()
    {
        return $this->hasMany(Event::class);
    }
}

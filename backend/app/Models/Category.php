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
        "rules",
        "image"
    ];

    // Relation between event and category ;
    public function events()
    {
        return $this->hasMany(Event::class);
    }
}

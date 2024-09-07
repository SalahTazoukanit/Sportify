<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


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
        "status"
    ];

    // Relation between event and category ;
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    // Relation between users and events ;
    public function participants()
    {
        return $this->belongsToMany(User::class);
    }
}

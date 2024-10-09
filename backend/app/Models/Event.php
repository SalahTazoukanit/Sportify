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

    public function user(){
        return $this->belongsTo(User::class);
    }

    // Relation between users and events for tabe_pivot user_event (participants) ;
    public function participants()
    {
        return $this->belongsToMany(User::class);
    }

    //
    //Relation to define table_pivot user_favourite
    public function usersFavourites(){
        return $this->belongsToMany(User::class ,'user_favourite');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;

    protected $table = 'groups';
    protected $fillable = [
        'name',
        'description',
        'owner_id',
        'last_message_id',
    ];

    public function lastMessage()
    {
        return $this->belongsTo(Message::class, 'last_message_id');
    }

    public function users()
    {
        return $this->belongsToMany(User::class, 'group_users');
    }

    public function messages()
    {
        return $this->hasMany(Message::class);
    }

    public function owner()
    {
        return $this->belongsTo(User::class);
    }

    public static function getGroupsForUser(User $user)
    {
        $query = self::query()
            ->select([
                'groups.*',
                'm.message as last_message',
                'm.created_at as last_message_date',
            ])
            ->join('group_users as gu', 'gu.group_id', '=', 'groups.id')
            ->leftJoin('messages as m', 'm.id', '=', 'groups.last_message_id')
            ->where('gu.user_id', $user->id)
            ->orderBy('m.created_at', 'desc')
            ->orderBy('groups.name', 'asc');

        // dd($query->toSql());
        return $query->get();
    }

    public function toConversationArray()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'description' => $this->description,
            'is_group' => true,
            'is_user' => false,
            'owner_id' => $this->owner_id,
            'users' => $this->users,
            'user_id' => $this->users->pluck('id'),
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
            'last_message' => $this->last_message,
            'last_message_date' => $this->last_message_date ? $this->last_message_date : null,
        ];
    }

    public static function updateGroupWithMessage($groupId, $message)
    {
        return self::updateOrCreate(
            ['id' => $groupId],
            ['last_message_id' => $message->id],
        );
    }
}

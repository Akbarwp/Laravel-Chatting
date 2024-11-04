<?php

namespace App\Http\Controllers;

use App\Mail\UserBlockUnblock;
use App\Mail\UserCreated;
use App\Mail\UserRoleChanged;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'is_admin' => 'boolean',
        ]);

        $rawPassword = str()->random(8);
        // $rawPassword ="password";
        $data['password'] = Hash::make($rawPassword);
        $data['email_verified_at'] = now();

        $user = User::create($data);

        Mail::to($user)->send(new UserCreated($user, $rawPassword));

        return redirect()->back();
    }

    public function changeRole(User $user)
    {
        $user->update(['is_admin' => !(bool) $user->is_admin]);
        $message = "Role changed to " . ($user->is_admin ? 'Admin' : 'Regular User');

        Mail::to($user)->send(new UserRoleChanged($user));

        return response()->json(['message' => $message]);
    }

    public function blockUnblock(User $user)
    {
        if ($user->blocked_at) {
            $user->blocked_at = null;
            $message = '🎉 Congratulations! User "'. $user->name .'" has been successfully activated! 🎉';
        } else {
            $user->blocked_at = now();
            $message = '⚠️ Important Notice: User "'. $user->name .'" Has Been Blocked ⚠️';
        }

        $user->save();

        Mail::to($user)->send(new UserBlockUnblock($user));

        return response()->json(['message' => $message]);
    }
}

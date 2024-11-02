<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'is_admin' => 'boolean',
        ]);

        // $rawPassword = str()->random(8);
        $rawPassword ="password";
        $data['password'] = Hash::make($rawPassword);
        $data['email_verified_at'] = now();

        $user = User::create($data);

        return redirect()->back();
    }

    public function changeRole(User $user)
    {
        $user->update(['is_admin' => !(bool) $user->is_admin]);
        $message = "Role changed to " . $user->is_admin ? 'Admin' : 'Regular User';
        return response()->json(['message' => $message]);
    }

    public function blockUnblock(User $user)
    {
        if ($user->blocked_at) {
            $user->blocked_at = null;
            $message = "🎉 Congratulations! Your account has been successfully activated! 🎉";
        } else {
            $user->blocked_at = now();
            $message = "⚠️ Important Notice: Your Account Has Been Blocked ⚠️";
        }

        $user->save();

        return response()->json(['message' => $message]);
    }
}

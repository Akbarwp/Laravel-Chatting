<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Jobs\DeleteGroupJob;
use Illuminate\Support\Facades\Auth;

class GroupController extends Controller
{
    public function store(StoreGroupRequest $request)
    {
        $data = $request->validated();
        $user_id = $data['user_id'] ?? [];
        $group = Group::create($data);
        $group->users()->attach(array_unique([$request->user()->id, ...$user_id]));

        return redirect()->back();
    }

    public function update(UpdateGroupRequest $request, Group $group)
    {
        $data = $request->validated();
        $user_id = $data['user_id'] ?? [];
        $group->update($data);

        // remove all users & attache new users
        $group->users()->detach();
        $group->users()->attach(array_unique([$request->user()->id, ...$user_id]));

        return redirect()->back();
    }

    public function destroy(Group $group)
    {
        // check if user the owner of group
        if ($group->owner_id != Auth::user()->id) {
            abort(403);
        }

        DeleteGroupJob::dispatch($group)->delay(now()->addSeconds(7));

        return response()->json(['message' => 'The group deletion has been scheduled and will be removed shortly']);
    }
}

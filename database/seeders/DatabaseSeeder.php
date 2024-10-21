<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Admin admin',
            'email' => 'admin@gmail.com',
            'is_admin' => true,
        ]);
        User::factory()->create([
            'name' => 'Ucup ucup',
            'email' => 'ucup@gmail.com',
        ]);
        User::factory(10)->create();

        for ($i = 0; $i < 5; $i++) {
            $group = Group::factory()->create([
                'owner_id' => 1,
            ]);

            $users = User::inRandomOrder()->limit(rand(2, 5))->pluck('id');
            $group->users()->attach(array_unique([1, ...$users]));
        }

        Message::factory(1000)->create();
        $messages = Message::whereNull('group_id')->orderBy('created_at', 'asc')->get();

        $conversations = $messages->groupBy(function ($message) {
            return collect([$message->sender_id, $message->receiver_id])->sort()->implode('_');
        })->map(function ($groupedMessages) {
            return [
                'user_id1' => $groupedMessages->first()->sender_id,
                'user_id2' => $groupedMessages->first()->receiver_id,
                'last_message_id' => $groupedMessages->last()->id,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ];
        })->values();

        Conversation::insertOrIgnore($conversations->toArray());

        Message::create([
            'sender_id' => 1,
            'receiver_id' => 2,
            'message' => "
# Heading 1
## Heading 2
### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6
This is a paragraph with **bold text**, *italic text*, and `inline code`. Here's a [link to Google](https://www.google.com).
---
> This is a blockquote. Blockquotes are useful for highlighting important notes or citations.
Here is a list:
- Item 1
- Item 2
   - Subitem 2.1
   - Subitem 2.2
- Item 3
Here is an ordered list:
1. First item
2. Second item
   1. Subitem 2.1
   2. Subitem 2.2
3. Third item
```python
# This is a code block for Python
def hello_world():
   print('Hello, world!')
            ",
        ]);
        Message::create([
            'sender_id' => 2,
            'receiver_id' => 1,
            'message' => "🤣🦊😀"
        ]);
    }
}

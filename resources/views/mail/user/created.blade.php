<x-mail::message>
Hello {{ $user->name }},

We are excited to inform you that your account has been successfully created by our admin team! Here is everything you need to get started.

**Account Details:**

Email: {{ $user->email }} <br>
Temporary Password: {{ $password }} <br>
(Please change your password upon your first login for security)
<x-mail::button :url="route('login')" color="primary">
Click to Login
</x-mail::button>

To get started, simply log in with the details above. Once inside, you will have access to everything you need.

If you have any questions or need assistance, feel free to reach out to us at {{ config('app.email') }} we are here to help!

Welcome aboard, <br>
{{ config('app.name') }}
</x-mail::message>

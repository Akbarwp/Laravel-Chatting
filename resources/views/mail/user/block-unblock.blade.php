<x-mail::message>
Hello {{ $user->name }},

We are writing to inform you that your account status has been updated by our admin team.

**Current Status:**

@if ($user->blocked_at)
If your account has been blocked, this may be due to security reasons or a policy review. If you have any questions or would like more details about this status change, please contact us at {{ config('app.email') }}.
@else
If your account has been unblocked, you now have full access and can log in as usual. We recommend reviewing your account settings to ensure everything is up-to-date.
<x-mail::button :url="route('login')" color="primary">
Click to Login
</x-mail::button>
@endif

Thank you for your understanding and cooperation.

Best regards, <br>
{{ config('app.name') }}
</x-mail::message>

<x-mail::message>
Hello {{ $user->name }},

We are reaching out to inform you that your account role has been successfully updated by our admin team.

@if ($user->is_admin)
You now have access to additional features and settings to help manage our platform. Please use these privileges responsibly and reach out if you have any questions regarding your new permissions.
@else
Your access is now limited to standard features. Should you require additional permissions or have any questions, please contact us at {{ config("app.email") }}.
@endif

Thank you for being a valuable part of our team!

Best regards, <br>
{{ config("app.name") }}
</x-mail::message>

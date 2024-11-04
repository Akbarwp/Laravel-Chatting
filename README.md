# Laravel Chatting

Laravel Chatting is a chat platform built with Laravel Reverb using WebSocket for real-time communication, ensuring that messages are sent and received instantly. Utilizing the Laravel framework and MySQL database, it enables users to send text messages, images, audio, files, and voice messages directly to other users or within groups. These features support a more interactive experience, from private conversations to group discussions, while maintaining security and speed in multimedia message exchange.

## Tech Stack

- **Laravel 11**
- **Laravel Reverb**
- **Laravel Breeze**
- **MySQL Database**
- **Inertia - ReactJS**
- **Headless UI**
- **Aceternity UI**
- **TailwindCSS**
- **daisyUI**

## Features

- Main features available in this application:
  - Real-time communication
  - Block unblock User
  - Change role User
  - Create new User
  - Delete message
  - CRUD Group
  - Sending email

## Installation

Follow the steps below to clone and run the project in your local environment:

1. Clone repository:

    ```bash
    git clone https://github.com/Akbarwp/Laravel-Chatting.git
    ```

2. Install dependencies use Composer and NPM:

    ```bash
    composer install
    npm install
    ```

3. Copy file `.env.example` to `.env`:

    ```bash
    cp .env.example .env
    ```

4. Generate application key:

    ```bash
    php artisan key:generate
    ```

5. Setup database and other key in the `.env` file:

    ```plaintext
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=laravel_chatting
    DB_USERNAME=root
    DB_PASSWORD=
    ```

    ```plaintext
    BROADCAST_CONNECTION=reverb
    APP_EMAIL="hello@example.com"
    MAIL_MAILER=log
    MAIL_HOST=127.0.0.1
    MAIL_PORT=2525
    MAIL_USERNAME=null
    MAIL_PASSWORD=null
    MAIL_ENCRYPTION=null
    MAIL_FROM_ADDRESS="hello@example.com"
    MAIL_FROM_NAME="${APP_NAME}"
    ```

7. Run migration database:

    ```bash
    php artisan migrate
    ```

8. Run website:

    ```bash
    npm run dev
    php artisan serve
    php artisan reverb:start
    php artisan queue:listen
    ```

## Screenshot

- ### **Home**

<img src="https://github.com/user-attachments/assets/4cbd3e08-7192-48dd-95d2-e309149f6ff1" alt="Halaman Home" width="" />
<br><br>

- ### **Online Users**

<img src="https://github.com/user-attachments/assets/fa25d979-1aa0-44ce-95c4-c6f739a9776c" alt="Halaman Online Users" width="" />
<br><br>

- ### **Chat User**

<img src="https://github.com/user-attachments/assets/8c80de46-ddf0-4853-a16e-12d0031e0cc4" alt="Halaman Chat User" width="" />
<br><br>

- ### **Chat Group**

<img src="https://github.com/user-attachments/assets/9ca48fd6-b163-44bc-a086-dd4af78ab1a7" alt="Halaman Chat Group" width="" />
<br><br>

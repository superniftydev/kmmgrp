<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->withPersonalTeam()->create();

        User::factory()->withPersonalTeam()->create([
            'name' => env('FIRST_ADMIN_NAME'),
            'email' => env('FIRST_ADMIN_EMAIL'),
            'password' => bcrypt(env('FIRST_ADMIN_PASSWORD')),
        ]);
    }
}

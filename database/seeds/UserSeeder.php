<?php

use Illuminate\Database\Seeder;
use App\User;

class UserSeeder extends Seeder
{
	private $userData = [];

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i < 1000; $i++) {
            $userData[] = [
                'name' => Str::random(8),
                'email' => Str::random(10).'@system.com',
                'password' => Hash::make('password')
            ];
        }

        foreach ($userData as $user) {
            User::create($user);
        }
    }
}

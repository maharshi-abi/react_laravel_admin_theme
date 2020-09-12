<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\User;
use JWTAuth;
use JWTAuthException;

class APIController extends Controller
{
    public function users()
    {
      try{
        $users = User::all();
        $response = ['success'=>true,'message' => 'user list !!','data'=>$users];
    }catch (\Exception $e){
        return [
        'success'  => false,
        'message'   => $e->getMessage()
        ];
    }
    return response()->json($response, 201);
}

    public function profile()
    {
        try{
            $user = JWTAuth::parseToken()->authenticate();
            $response = ['success'=> true,'message' => 'user profile !!','data'=> $user];
        }catch (\Exception $e){
            $response = ['success'=> false,'message' => '','data'=> $e->getMessage()];
        }
        return response()->json($response, 201);
    }

}

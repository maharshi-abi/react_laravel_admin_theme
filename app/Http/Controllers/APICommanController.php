<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\User;
use JWTAuth;
use JWTAuthException;

class APICommanController extends Controller
{
  private function getToken($email, $password)
  {
    $token = null;
    try {
      if (!$token = JWTAuth::attempt( ['email'=>$email, 'password'=>$password])) {
        return response()->json([
          'success' => false,
          'message' => 'Password or email is invalid',
          'token'=> $token
          ]);
      }
    } catch (JWTAuthException $e) {
      return response()->json([
        'success' => false,
        'message' => 'Token creation failed',
        ]);
    }
    return $token;
  }

  public function login(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'email'      => 'required',
      'password'    => 'required',
      ]);
    if ($validator->fails()) {
      return response()->json([
        'success'    => 'false',
        'message'   => $validator->errors()->first()
        ]);
    }
    try{
      $user = User::where('email', $request->email)->get()->first();
      if ($user && \Hash::check($request->password, $user->password))
      {
        $token = self::getToken($request->email, $request->password);
        $user->save();
        $response = ['success'=>true,'message' => 'Login successfully !!','data'=>['auth_token'=>$token,'id'=>$user->id,'name'=>$user->name, 'email'=>$user->email]];
      }
      else
        $response = ['success'=>false, 'message'=>'User not found !!'];

    }catch(Exception $e){
      $response = [
      'success'   => false,
      'message'  => $e->getMessage()
      ];
    }

    return response()->json($response, 200);
  }

  public function register(Request $request)
  {
    $validator = Validator::make($request->all(), [
      'name' => ['required', 'string', 'max:255'],
      'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
      'password' => ['required', 'string', 'min:8', 'confirmed'],
      'password_confirmation' => ['required','string', 'min:8'],
      ]);

    if ($validator->fails()) {
      return response()->json([
        'success'    => false,
        'message'   => $validator->errors()->first()
        ]);
    }

    $payload = [
    'password'=>\Hash::make($request->password),
    'email'=>$request->email,
    'name'=>$request->name,
    ];

    $user = new User($payload);

    if ($user->save())
    {
        $token = self::getToken($request->email, $request->password); // generate user token

        if (!is_string($token))  return response()->json(['success'=>false,'message'=>'Token generation failed']);

        $user = User::where('email', $request->email)->get()->first();

        $user->save();

        $response = ['success'=>true,'message' => 'Register successfully !!','data'=>['auth_token'=>$token,'id'=>$user->id,'name'=>$user->name,'email'=>$request->email]];
      }

      else
        $response = ['success'=>false, 'message'=>'Something Went wrong !!'];

      return response()->json($response, 201);
    }

  }

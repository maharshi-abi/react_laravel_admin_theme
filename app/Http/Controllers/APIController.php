<?php

namespace App\Http\Controllers;
use Exception;
use Illuminate\Http\Request;
use App\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use JWTAuth;
use JWTAuthException;

class APIController extends Controller
{
    public function users(Request $request)
    {
      try{
          $getData = $request->all();
          if(isset($getData['search'])){
              $users = User::where('name', 'LIKE', '%' . $getData['search'] . '%')->orWhere('email', 'LIKE', '%' . $getData['search'] . '%')->latest()->paginate(5);
          }else{
              $users = User::latest()->paginate(5);
          }
          $allUser = User::latest()->get();
          $response = ['success'=>true,'message' => 'user list !!','data'=>$users,'exportData'=>$allUser];
    }catch (Exception $e){
        return [
        'success'  => false,
        'message'   => $e->getMessage()
        ];
    }
    return response()->json($response, 200);
}

    public function profile(Request $request)
    {
        try{
            $user = JWTAuth::parseToken()->authenticate();
            if($request->user_id){ $user = User::find($request->user_id);}
            $response = ['success'=> true,'message' => 'user profile !!','data'=> $user];
        }catch (Exception $e){
            $response = ['success'=> false,'message' => '','data'=> $e->getMessage()];
        }
        return response()->json($response, 200);
    }

    public function viewProfile(Request $request)
    {
        try{
            $user = JWTAuth::parseToken()->authenticate();
            if($request->user_id){ $user = User::find($request->user_id);}
            $response = ['success'=> true,'message' => 'user profile !!','data'=> $user];
        }catch (Exception $e){
            $response = ['success'=> false,'message' => '','data'=> $e->getMessage()];
        }
        return response()->json($response, 200);
    }

    public function removeUser($id)
    {
        try{
            $user = User::find($id);
            if($user){
                $user->delete();
            }
            $users = User::latest()->paginate(5);
            $allUser = User::latest()->get();
            $response = ['success'=> true,'message' => 'User Deleted !!','data'=>$users,'exportData'=>$allUser];
        }catch (Exception $e){
            $response = ['success'=> false,'message' => $e->getMessage(),'data'=> []];
        }
        return response()->json($response, 204);
    }

    public function updateProfile(Request $request)
    {
        try{
            $user = JWTAuth::parseToken()->authenticate();
            $validator = Validator::make($request->all(), [
                'name' => ['required', 'string', 'min:4','max:20'],
                'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
            ]);

            if(!empty($request->password)){
                $validator = Validator::make($request->all(), [
                    'password' => ['sometimes','required', 'string', 'min:6'],
                    'password_confirmation' => ['sometimes','required','string', 'min:6','different:password'],
                ]);
            }

            if ($validator->fails()) {
                return response()->json([
                    'success'    => false,
                    'message'   => $validator->errors()->first()
                ]);
            }

            if ($request->avatar){
                $image =  $request->avatar;
                $name = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                Storage::disk('public')->putFileAs('avatar', $image,$name);
                $user->avatar = $name;
            }
            $user->name = $request->name;
            $user->email = $request->email;

            if(!empty($request->password_confirmation)){
                if (!(Hash::check($request->password, $user->password))) {
                    return response()->json(['success'    => false,'message'   => 'Please enter valid previous password']);
                }
                $user->password = Hash::make($request->password_confirmation);
            }
            $user->save();

            $response = ['success'=> true,'message' => 'Profile updated !!','data'=> $user];
        }catch (Exception $e){
            $response = ['success'=> false,'message' => '','data'=> $e->getMessage()];
        }
        return response()->json($response, 200);
    }

    public function createUser(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                'name' => ['required', 'string', 'min:4','max:20'],
            ]);

            if($request->update_user){
                $user = User::find($request->update_user);
                $validator = Validator::make($request->all(), [
                    'email' => ['required', 'email', Rule::unique('users')->ignore($user->id)],
                ]);
            }else{
                $validator = Validator::make($request->all(), [
                    'email' => ['required', 'email', 'min:6',Rule::unique('users')],
                ]);
            }

            if ($validator->fails()) {
                return response()->json([ 'success' => false, 'message' => $validator->errors()->first() ]);
            }

            if ($request->avatar && !empty($request->avatar)){
                $image =  $request->avatar;
                $avatar = time().'.' . explode('/', explode(':', substr($image, 0, strpos($image, ';')))[1])[1];
                Storage::disk('public')->putFileAs('avatar', $image,$avatar);
                $record = [
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => \Hash::make($request->email),
                    'avatar' => @$avatar,
                ];
            }else{
                $record = [
                    'name' => $request->name,
                    'email' => $request->email,
                    'password' => \Hash::make($request->email),
                ];
            }

            if($request->update_user) {
                User::where('id',$user->id)->update($record);
                $msg = 'User Updated !!';
            }else{
                User::create($record);
                $msg = 'User Created !!';
            }

            $response = ['success'=> true,'message' => $msg,'data'=> ''];
        }catch (Exception $e){
            $response = ['success'=> false,'message' => '','data'=> $e->getMessage()];
        }
        return response()->json($response, 200);
    }

}

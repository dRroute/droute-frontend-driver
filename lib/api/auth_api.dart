import 'package:droute_driver_frontend/api/api_client.dart';

class AuthApi {
  final ApiClient apiClient = ApiClient();

  // Login API
  Future<Map<String, dynamic>> login(String emailOrPhone, String password) async {
    // final body = {
    //   'emailOrPhone': emailOrPhone,
    //   'password': password,
    // };
    return await apiClient.get('driver/auth/login?emailOrPhone=$emailOrPhone&password=$password');
  }


  // Register API
  Future<Map<String, dynamic>> register(String fullName, String password, String email,String contactNo) async {
    final body = {
      'fullName': fullName,
      'email': email,
      'password': password,
      'contactNo':contactNo,
      'role':"driver"

    };
    return await apiClient.post('driver/', body);
  }

  // OTP Request API
  Future<String> requestOtp(String emailId) async {
    return await apiClient.requestParam('driver/auth/sendOTP?email='+emailId);
  }
}

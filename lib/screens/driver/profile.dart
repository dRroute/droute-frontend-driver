import 'package:flutter/material.dart';
import 'package:droute_driver_frontend/styles/custom_widgets/custom_scaffold.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';

class ProfileScreen extends StatefulWidget {
  const ProfileScreen({super.key});

  @override
  State<ProfileScreen> createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  double progress=1;

  initState() {
    print("initState Called");
  }
  void updateProgress(double newValue) {
    setState(() {
      progress = newValue;
    });
  }
  Color getProgressColor(double value) {
    if (value <= 0.2) {
      return Colors.red;
    } else if (value <= 0.4) {
      return Colors.orange;
    } else if (value <= 0.6) {
      return Colors.amber;
    } else if (value <= 0.8) {
      return Colors.lightGreen;
    } else {
      return Colors.green;
    }
  }


  @override
  Widget build(BuildContext context) {
    return CustomScaffold(

      body: Container(
        color: Colors.white,
        child: Padding(
          padding: const EdgeInsets.only(left:20,top:60,right: 20,bottom: 0),

          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Center(
                child: Stack(
                  alignment: Alignment.center,
                  children: [
                    SizedBox(
                      width: 130, // Adjust for border size
                      height: 130,
                      child: TweenAnimationBuilder<double>(
                        tween: Tween<double>(begin: 0, end: progress),
                        duration: Duration(seconds: 1),
                        builder: (context, value, child) {
                          return CircularProgressIndicator(
                            value: value,
                            strokeWidth: 6,
                            backgroundColor: Colors.grey[300],
                            valueColor: AlwaysStoppedAnimation(getProgressColor(value)),
                          );
                        },
                      ),
                    ),
                    Container(
                      padding: EdgeInsets.all(3),
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        border: Border.all(color: Colors.grey, width: 2),
                      ),
                      child: CircleAvatar(
                        radius: 60,
                        backgroundColor: Colors.grey[300],
                        foregroundImage: NetworkImage(
                            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'),
                        child: const Icon(Icons.person, size: 60, color: Colors.white),
                      ),
                    ),
                    Positioned(
                      bottom: 5,
                      right: 10,
                      child: Container(
                        padding: EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                        decoration: BoxDecoration(
                          color: getProgressColor(progress),
                          borderRadius: BorderRadius.circular(12),
                        ),
                        child: Text(
                          "${(progress * 100).toInt()}%",
                          style: TextStyle(color: Colors.white, fontSize: 14),
                        ),
                      ),
                    ),
                  ],
                ),
              ),
              Center(
                child:  Text.rich(
                  TextSpan(
                    children: [
                      TextSpan(
                        text: 'Driver Name\n',
                        style: TextStyle(
                          fontSize: 24,
                          fontWeight: FontWeight.bold,
                          color: Colors.black,
                        ),
                      ),
                      TextSpan(
                        text: 'driveremail@gmail.com',
                        style: TextStyle(
                          fontSize: 16,
                          fontWeight: FontWeight.w400,
                          color: Colors.teal,
                        ),
                      ),
                    ],
                  ),
                  textAlign: TextAlign.center,
                ),
              ),
              SizedBox(height: 5),

               const SizedBox(height: 16),
              _buildProfileMenuItem(Icons.person, 'My profile'),
              _buildProfileMenuItem(Icons.payment, 'Payment methods'),
              _buildProfileMenuItem(Icons.shopping_cart, 'Orders'),
              _buildProfileMenuItem(Icons.car_rental, 'Journey'),
              _buildProfileMenuItem(Icons.help, 'Help & support'),
              _buildProfileMenuItem(Icons.logout, 'Log Out'),
              SizedBox(height: 10,)
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildProfileMenuItem(IconData icon, String text) {
    return InkWell( // Makes the list items tappable
      onTap: () {
        // Handle navigation or actions for each item
        print('Tapped on $text'); // Example: print to console
      },
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 8.0),
        child: Row(
          children: [
            Icon(icon ,
            size:30 ,
                color: Color(0xFF082131),
            ),
            const SizedBox(width: 20),
            Text(text,
            style: TextStyle(
              fontSize: 18,
              color: Color(0xFF082131),

            ),),
          ],
        ),
      ),
    );
  }
}

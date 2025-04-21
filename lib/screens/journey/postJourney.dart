import 'package:droute_driver_frontend/screens/map/arrivalSelectionPage.dart';
import 'package:droute_driver_frontend/screens/map/departureSelectionPage.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:droute_driver_frontend/styles/color/app_color.dart';

class PostJourney extends StatefulWidget {
  @override
  _PostJourneyState createState() => _PostJourneyState();
}

class _PostJourneyState extends State<PostJourney> {
  String? departureAddress, arrivalAddress;
  DateTime? departureDateTime, arrivalDateTime;
  String? departureCoordinates, arrivalCoordinates;
  TextEditingController weightController = TextEditingController();
  TextEditingController heightController = TextEditingController();
  TextEditingController widthController = TextEditingController();
  TextEditingController lengthController = TextEditingController();

  Future<void> _selectLocation(BuildContext context, bool isDeparture) async {
    final result = await Navigator.push(
      context,
      MaterialPageRoute(
          builder: (context) =>
          isDeparture ? DepartureLocationSelectionPage() : ArrivalLocationSelectionPage()),
    );
    if (result != null && result is Map<String, String>) {
      setState(() {
        if (isDeparture) {
          departureAddress = result['address'];
          departureCoordinates = result['coordinates'];
        } else {
          arrivalAddress = result['address'];
          arrivalCoordinates = result['coordinates'];
        }
      });
    }
  }

  Future<void> _selectDateTime(BuildContext context, bool isDeparture) async {
    DateTime now = DateTime.now();
    DateTime? pickedDate = await showDatePicker(
      context: context,
      initialDate: now,
      firstDate: now,
      lastDate: DateTime(2100),
    );
    if (pickedDate != null) {
      TimeOfDay? pickedTime = await showTimePicker(
        context: context,
        initialTime: TimeOfDay.now(),
      );
      if (pickedTime != null) {
        DateTime finalDateTime = DateTime(pickedDate.year, pickedDate.month, pickedDate.day,
            pickedTime.hour, pickedTime.minute);
        setState(() {
          if (isDeparture) {
            departureDateTime = finalDateTime;
          } else {
            arrivalDateTime = finalDateTime;
          }
        });
      }
    }
  }

  void _submitForm() {
    print("Departure: $departureAddress at $departureDateTime");
    print("Arrival: $arrivalAddress at $arrivalDateTime");
    print("Dimensions: ${weightController.text}kg, ${heightController.text}cm, ${widthController.text}cm, ${lengthController.text}cm");
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 2,
        centerTitle: true,
        title: Text('Post a New Journey',
            style: TextStyle(color: Colors.black, fontSize: 16, fontWeight: FontWeight.w500)),
        leading: IconButton(
          icon: Icon(Icons.arrow_back, color: Colors.black),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        padding: EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildLabel("Departure Location"),
        Row(
        children: [

            Expanded(child: _buildLocationPicker(context, "Select Departure Location", true, departureAddress),),
        ],
        ),
            _buildLabel("Arrival Location"),
      Row(
        children: [

            Expanded(child: _buildLocationPicker(context, "Select Arrival Location", false, arrivalAddress),),
        ],
      ),
            SizedBox(height: 12),

            Row(
              children: [
                Expanded(child:  _buildLabel("Departure Date"),),
                SizedBox(width: 10),
                Expanded(child:  _buildLabel("Expected Arrival Date"),),
              ],
            ),
            Row(
              children: [
                Expanded(child: _buildDateTimePicker(context, "Dep. Date & Time", true, departureDateTime)),
                SizedBox(width: 10),
                Expanded(child: _buildDateTimePicker(context, "Arr. Date & Time", false, arrivalDateTime)),
              ],
            ),
            SizedBox(height: 16),
            Divider(color: Colors.grey[300]),
            _buildLabel("Available Capacity"),
            SizedBox(height: 8),
            _buildDimensionsCard(),
            SizedBox(height: 24),
            _buildSubmitButton(),
          ],
        ),
      ),
    );
  }

  Widget _buildLabel(String text) {
    return Padding(
      padding: const EdgeInsets.only(top: 8, bottom: 4),
      child: Text(text, style: TextStyle(fontSize: 12, fontWeight: FontWeight.w600, color:Colors.black54)),
    );
  }

  Widget _buildLocationPicker(BuildContext context, String placeholder, bool isDeparture, String? address) {
    return GestureDetector(
      onTap: () => _selectLocation(context, isDeparture),
      child: Container(
        padding: EdgeInsets.all(12),
        margin: EdgeInsets.only(bottom: 12),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          address ?? placeholder,
          style: TextStyle(fontSize: 14, color: Colors.black54),
        ),
      ),
    );
  }

  Widget _buildDateTimePicker(BuildContext context, String label, bool isDeparture, DateTime? dateTime) {
    return GestureDetector(
      onTap: () => _selectDateTime(context, isDeparture),
      child: Container(
        padding: EdgeInsets.all(12),
        decoration: BoxDecoration(
          border: Border.all(color: Colors.grey),
          borderRadius: BorderRadius.circular(8),
        ),
        child: Text(
          dateTime != null ? DateFormat('yyyy-MM-dd HH:mm').format(dateTime) : label,
          style: TextStyle(fontSize: 14, color: Colors.black54),
        ),
      ),
    );
  }

  Widget _buildDimensionsCard() {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(10)),
      child: Padding(
        padding: EdgeInsets.all(12),
        child: Column(
          children: [
            Row(
              children: [
                Expanded(child: _buildInputField("Weight (kg)", weightController)),
                SizedBox(width: 10),
                Expanded(child: _buildInputField("Height (cm)", heightController)),
              ],
            ),
            SizedBox(height: 12),
            Row(
              children: [
                Expanded(child: _buildInputField("Width (cm)", widthController)),
                SizedBox(width: 10),
                Expanded(child: _buildInputField("Length (cm)", lengthController)),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildInputField(String label, TextEditingController controller) {
    return TextField(
      controller: controller,
      keyboardType: TextInputType.number,
      style: TextStyle(fontSize: 14), // Set font size
      decoration: InputDecoration(
        labelText: label,
        labelStyle: TextStyle(fontSize: 14), // Set label font size
        border: OutlineInputBorder(),
      ),
    );
  }


  Widget _buildSubmitButton() {
    return SizedBox(
      width: double.infinity,
      height: 50,
      child: ElevatedButton(
        onPressed: _submitForm,
        style: ElevatedButton.styleFrom(backgroundColor: AppColor.primaryColor, shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(8))),
        child: Text("Submit", style: TextStyle(color: Colors.white, fontSize: 18, fontWeight: FontWeight.w600)),
      ),
    );
  }
}

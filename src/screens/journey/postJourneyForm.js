import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import MyStatusBar from "../../components/myStatusBar";
import {
  commonAppBar,
  inputBox,
  typeSection,
} from "../../components/commonComponents";
import { trimText } from "../../utils/commonMethods";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors, commonStyles } from "../../constants/styles";
import { TextInput } from "react-native-gesture-handler";

const PostJourney = () => {
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedField, setSelectedField] = useState(null);
  const [departureDateTime, setDepartureDateTime] = useState("");
  const [arrivalDateTime, setArrivalDateTime] = useState("");
  const [isPickerVisible, setPickerVisible] = useState(false);
  const [weight, setWeight] = useState(null);
  const [height, setHeight] = useState(null);
  const [width, setWidth] = useState(null);
  const [length, setLength] = useState(null);
  const [lengthUnit, setLengthUnit] = useState(null);
  const [weightUnit, setWeightUnit] = useState(null);
  const showPicker = () => setPickerVisible(true);
  const hidePicker = () => setPickerVisible(false);

  const handleConfirm = (date) => {
    const formatted = date.toLocaleString([], {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    if (selectedField === "departure") {
      setDepartureDateTime(formatted);
    } else if (selectedField === "arrival") {
      setArrivalDateTime(formatted);
    }

    hidePicker();
  };

  const handleVisibility = (form) => {
    const formKey = String(form);
    if (selectedForm !== formKey) {
      setSelectedForm(formKey);
    }
  };
  const LabeledInput = ({
    label,
    placeholder,
    value,
    onChangeText,
    required = false,
    style,
  }) => {
    return (
      <View style={[{ flex: 1 }, style]}>
        <Text style={styles.sectionLabel}>
          {label}
          {required && (
            <Text style={{ color: Colors.darkOrangeColor }}> *</Text>
          )}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          maxLength={80}
          keyboardType="numeric"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <MyStatusBar />
      {commonAppBar("Post journey")}
      {locationDetail?.()}
      {additionalDetail?.()}
      <TouchableOpacity
        style={{ ...commonStyles.button, marginHorizontal: 10 ,marginVertical:50 }}
        onPress={() => {}}
      >
        <Text style={{ ...commonStyles.buttonText }}>Submit</Text>
      </TouchableOpacity>
    </View>
  );

  function locationDetail() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleVisibility("locationDetail")}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Location Detail</Text>
          {selectedForm === "locationDetail" && (
            <>
              <View style={styles.routeContainer}>
                <View style={styles.timeline}>
                  <View style={styles.timelineCircleFilled} />
                  <View style={styles.timelineLine} />
                  <View style={styles.timelineCircleEmpty} />
                </View>

                <View style={styles.addressesContainer}>
                  <Text style={styles.addressText}>
                    {trimText(
                      "njdbedjbdjkebdjkbed hvqwqhd hjvqwhdv jbjksb bsjbsbsb bsjsnks bssjjbs",
                      50
                    )}
                  </Text>
                  <View style={{ height: 25 }} />
                  <Text style={styles.addressText}>
                    {trimText(
                      "njdbedjbdjkebdjkbed jebdjkb hvhvdhwqd bhjb gugv ggu gyghv gygyv gyyv ",
                      50
                    )}
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  }
  function additionalDetail() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => handleVisibility("additionalDetail")}
      >
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Additional Detail</Text>
          {selectedForm === "additionalDetail" && (
            <>
              {dateTimeInfo?.()}
              {capacitySection?.()}
            </>
          )}
        </View>
      </TouchableOpacity>
    );
  }

  function dateTimeInfo() {
    return (
      <>
        <Text style={styles.sectionLabel}>
          Date & Time <Text style={{ color: Colors.darkOrangeColor }}> *</Text>
        </Text>
        <View style={styles.customTimeContainer}>
          <TouchableOpacity
            style={styles.timeInput}
            onPress={() => {
              setSelectedField("departure");
              showPicker();
            }}
          >
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              {departureDateTime || "Departure Time"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.timeInput}
            onPress={() => {
              setSelectedField("arrival");
              showPicker();
            }}
          >
            <Text style={{ fontSize: 12, textAlign: "center" }}>
              {arrivalDateTime || "Arrival Time"}
            </Text>
          </TouchableOpacity>
        </View>

        <DateTimePickerModal
          isVisible={isPickerVisible}
          mode="datetime"
          onConfirm={handleConfirm}
          onCancel={hidePicker}
        />
      </>
    );
  }
  function capacitySection() {
    return (
      <>
        <View style={[styles.section, {}]}>
          {typeSection(weightUnit, setWeightUnit, "Select Weight Unit", false, [
            { label: "Ton", value: "Ton" },
            { label: "kg", value: "Kg" },
          ])}
        </View>
        <View style={[styles.section, {}]}>
          {typeSection(lengthUnit, setLengthUnit, "Select Length Unit", false, [
            { label: "meter", value: "m" },
            { label: "foot", value: "f" },
            { label: "Centimeter", value: "cm" },
          ])}
        </View>
        <View style={[styles.section, commonStyles.rowSpaceBetween]}>
          <LabeledInput
            label={`Weight (${weightUnit})`}
            placeholder="Enter Weight Capacity"
            value={weight}
            onChangeText={setWeight}
            required
            style={{ marginRight: 8 }}
          />
          <LabeledInput
            label={`Length (${lengthUnit})`}
            placeholder="Enter Length"
            value={length}
            onChangeText={setLength}
            required
            style={{ marginLeft: 8 }}
          />
        </View>

        <View style={[styles.section, commonStyles.rowSpaceBetween]}>
          <LabeledInput
            label={`Height (${lengthUnit})`}
            placeholder="Enter Height"
            value={height}
            onChangeText={setHeight}
            required
            style={{ marginRight: 8 }}
          />
          <LabeledInput
            label={`Width (${lengthUnit})`}
            placeholder="Enter Width"
            value={width}
            onChangeText={setWidth}
            required
            style={{ marginLeft: 8 }}
          />
        </View>
      </>
    );
  }
};

export default PostJourney;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: Colors.whiteColor,
    borderRadius: 12,
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius:12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginBottom: 16,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: Colors.primaryColor,
    marginBottom: 6,
  },
  //Location detail
  routeContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  timeline: {
    width: 20,
    alignItems: "center",
    marginRight: 8,
  },
  timelineCircleFilled: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.primaryColor,
  },
  timelineLine: {
    width: 1,
    height: 25,
    backgroundColor: Colors.primaryColor,
    marginVertical: 4,
    borderStyle: "dotted",
    borderWidth: 1,
  },
  timelineCircleEmpty: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.primaryColor,
    backgroundColor: Colors.whiteColor,
  },
  addressesContainer: {
    flex: 1,
  },
  addressText: {
    fontSize: 12,
    color: Colors.blackColor,
    lineHeight: 15,
  },
  customTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  timeInput: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    fontSize: 12,
    width: "48%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#e0e0e0",
    borderRadius: 8,
    padding: 10,
    fontSize: 12,
  },
  section: {
    marginBottom: 12,
  },
});

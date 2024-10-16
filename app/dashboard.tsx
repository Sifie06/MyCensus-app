import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { initializeDB, getCensusData, addCensusData, updateCensusData } from '@/database';

const Dashboard = () => {
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [llg, setLlg] = useState("");
  const [ward, setWard] = useState("");
  const [censusUnit, setCensusUnit] = useState("");
  const [censusUnitType, setCensusUnitType] = useState("");
  const [workloadNo, setWorkloadNo] = useState("");
  const [locality, setLocality] = useState("");
  const [section, setSection] = useState("");
  const [structureRecordNo, setStructureRecordNo] = useState("");
  const [lot, setLot] = useState("");
  const [householdNo, setHouseholdNo] = useState("");
  const [editingPersonId, setEditingPersonId] = useState<number | null>(null);
  const [censusData, setCensusData] = useState([]);

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDB();
      fetchCensusData();
    };

    setupDatabase();
  }, []);

  const fetchCensusData = async () => {
    const allCensusData = await getCensusData();
    setCensusData(allCensusData);
  };

  const handleSubmit = async () => {
    if (
      !province ||
      !district ||
      !llg ||
      !ward ||
      !censusUnit ||
      !censusUnitType ||
      !workloadNo ||
      !locality ||
      !section ||
      !structureRecordNo ||
      !lot ||
      !householdNo
    ) {
      Alert.alert("Error", "Please fill out all fields");
      return;
    }

    try {
      if (editingPersonId) {
        await updateCensusData(
          editingPersonId,
          province,
          district,
          llg,
          ward,
          censusUnit,
          censusUnitType,
          workloadNo,
          locality,
          section,
          structureRecordNo,
          lot,
          householdNo
        );
        console.log('Census data updated successfully');
      } else {
        const id = await addCensusData(
          province,
          district,
          llg,
          ward,
          censusUnit,
          censusUnitType,
          workloadNo,
          locality,
          section,
          structureRecordNo,
          lot,
          householdNo
        );
        console.log('Census data created successfully with ID:', id);
      }

      resetForm();
      fetchCensusData(); // Refresh the list
    } catch (error) {
      console.log("Error submitting census data:", error);
    }
  };

  const resetForm = () => {
    setProvince("");
    setDistrict("");
    setLlg("");
    setWard("");
    setCensusUnit("");
    setCensusUnitType("");
    setWorkloadNo("");
    setLocality("");
    setSection("");
    setStructureRecordNo("");
    setLot("");
    setHouseholdNo("");
    setEditingPersonId(null); // Reset ID for creating new entries
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container} 
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>INDICATIVE INFORMATION</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.introText}>Please fill out all the fields</Text>
        <TextInput
          style={styles.input}
          placeholder="Province"
          value={province}
          onChangeText={setProvince}
          placeholderTextColor="#A9CCE3"
        />
        <TextInput
          style={styles.input}
          placeholder="District"
          value={district}
          onChangeText={setDistrict}
          placeholderTextColor="#A9CCE3"
        />
        <TextInput
          style={styles.input}
          placeholder="Local Level Government (LLG)"
          value={llg}
          onChangeText={setLlg}
          placeholderTextColor="#A9CCE3"
        />
        <TextInput
          style={styles.input}
          placeholder="Ward"
          value={ward}
          onChangeText={setWard}
          placeholderTextColor="#A9CCE3"
        />
        <TextInput
          style={styles.input}
          placeholder="Census Unit (CU)"
          value={censusUnit}
          onChangeText={setCensusUnit}
          placeholderTextColor="#A9CCE3"
        />
        <TextInput
          style={styles.input}
          placeholder="Census Unit Type"
          value={censusUnitType}
          onChangeText={setCensusUnitType}
          placeholderTextColor="#A9CCE3"
        />
        <TextInput
          style={styles.input}
          placeholder="Workload No./Enumeration Area"
          value={workloadNo}
          onChangeText={setWorkloadNo}
          placeholderTextColor="#A9CCE3"
        />
        <TextInput
          style={styles.input}
          placeholder="Locality"
          value={locality}
          onChangeText={setLocality}
          placeholderTextColor="#A9CCE3"
        />
        <TextInput
          style={styles.input}
          placeholder="Section"
          value={section}
          onChangeText={setSection}
          placeholderTextColor="#A9CCE3"
        />
        <TextInput
          style={styles.input}
          placeholder="Structure/Record No."
          value={structureRecordNo}
          onChangeText={setStructureRecordNo}
          placeholderTextColor="#A9CCE3"
        />
        <TextInput
          style={styles.input}
          placeholder="Lot"
          value={lot}
          onChangeText={setLot}
          placeholderTextColor="#A9CCE3"
          keyboardType="numeric"  // Ensures only numeric input for Lot
        />
        <TextInput
          style={styles.input}
          placeholder="Household No."
          value={householdNo}
          onChangeText={setHouseholdNo}
          placeholderTextColor="#A9CCE3"
          keyboardType="numeric"  // Ensures only numeric input for Household No.
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save and Continue</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#ADD8E6", // Light blue background color
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: "#4A00E0", // Deep blue header background
    paddingVertical: 20,
    alignItems: "center",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  introText: {
    color: "#3498DB", // Blue intro text
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "white",
    borderColor: "#A9CCE3", // Light blue border
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#00C2FF", // Cyan button color
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Dashboard;

import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('census');

export interface CensusData {
  id: number;
  province: string;
  district: string;
  llg: string;
  ward: string;
  censusUnit: string;
  censusUnitType: string;
  workloadNo: string;
  locality: string;
  section: string;
  structureRecordNo: string;
  lot: string;
  householdNo: string;
}

export const initializeDB = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS census_data (
      id INTEGER PRIMARY KEY NOT NULL,
      province TEXT NOT NULL,
      district TEXT NOT NULL,
      llg TEXT NOT NULL,
      ward TEXT NOT NULL,
      censusUnit TEXT NOT NULL,
      censusUnitType TEXT NOT NULL,
      workloadNo TEXT NOT NULL,
      locality TEXT NOT NULL,
      section TEXT NOT NULL,
      structureRecordNo TEXT NOT NULL,
      lot TEXT NOT NULL,
      householdNo TEXT NOT NULL
    );
  `);
};

export const addCensusData = async (
  province: string,
  district: string,
  llg: string,
  ward: string,
  censusUnit: string,
  censusUnitType: string,
  workloadNo: string,
  locality: string,
  section: string,
  structureRecordNo: string,
  lot: string,
  householdNo: string
) => {
  try {
    const result = await db.runAsync(
      'INSERT INTO census_data (province, district, llg, ward, censusUnit, censusUnitType, workloadNo, locality, section, structureRecordNo, lot, householdNo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      province, district, llg, ward, censusUnit, censusUnitType, workloadNo, locality, section, structureRecordNo, lot, householdNo
    );
    return result.lastInsertRowId;
  } catch (error) {
    console.error("Error adding census data:", error);
  }
};

export const updateCensusData = async (
  id: number,
  province: string,
  district: string,
  llg: string,
  ward: string,
  censusUnit: string,
  censusUnitType: string,
  workloadNo: string,
  locality: string,
  section: string,
  structureRecordNo: string,
  lot: string,
  householdNo: string
) => {
  try {
    await db.runAsync(
      'UPDATE census_data SET province = ?, district = ?, llg = ?, ward = ?, censusUnit = ?, censusUnitType = ?, workloadNo = ?, locality = ?, section = ?, structureRecordNo = ?, lot = ?, householdNo = ? WHERE id = ?',
      province, district, llg, ward, censusUnit, censusUnitType, workloadNo, locality, section, structureRecordNo, lot, householdNo, id
    );
  } catch (error) {
    console.error("Error updating census data:", error);
  }
};

export const deleteCensusData = async (id: number) => {
  try {
    await db.runAsync('DELETE FROM census_data WHERE id = ?', id);
  } catch (error) {
    console.error("Error deleting census data:", error);
  }
};

export const getCensusData = async () => {
  try {
    const allRows = await db.getAllAsync('SELECT * FROM census_data') as CensusData[];
    return allRows;
  } catch (error) {
    console.error("Error getting census data:", error);
    return [];
  }
};

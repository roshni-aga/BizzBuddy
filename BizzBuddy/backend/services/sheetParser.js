import axios from "axios";
import csv from "csvtojson";

export async function parseSheet(csvUrl) {
  const res = await axios.get(csvUrl);

  const rows = await csv().fromString(res.data);

  return rows.map((r) => ({
    ...r,
    Status: r.Status?.toLowerCase().trim(),
    Active: r.Active?.toLowerCase().trim(),
  }));
}

import * as XLSX from "xlsx";

const useExportContact = () => {
  // get the table and the rows
  const table = document.getElementById("dataTable");
  const rows = Array.from(table.querySelectorAll("tbody tr"));

  // convert the data on the rows to json object
  const tableData = rows.map((row) => {
    const cell = row.querySelectorAll("td");
    return {
      ID: cell[0]?.innerText || "",
      Name: cell[1].innerText || "",
      PhoneNo: cell[2]?.innerText || "",
      Email: cell[3]?.innerText || "",
      Notes: cell[4]?.innerText || "",
    };
  });

  const workSheet = XLSX.utils.json_to_sheet(tableData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, workSheet, "Contacts");
  XLSX.writeFile(workbook, "Contacts.xlsx");
};

export default useExportContact;

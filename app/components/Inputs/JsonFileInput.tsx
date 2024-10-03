//ts-ignore
import React, { useState, useEffect } from "react";
import Papa from "papaparse";
interface JsonFileInput {
  onChange?: (e: any) => void;
  name?: string;
  label?: string;
  errMessage?: React.ReactNode | string;
}

const JsonFileInput = ({
  onChange,
  name,
  label,
  errMessage,
}: JsonFileInput) => {
  const [csvData, setCsvData] = useState([]);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      Papa.parse(file, {
        complete: (result: any) => {
          const csvString = result.data
            .map((row: any) => {
              if (Array.isArray(row)) {
                return row.join(", ");
              } else if (typeof row === "object") {
                return Object.values(row).join(", ");
              } else {
                return "";
              }
            })
            .join("\n");
          setCsvData(result.data);
        },
        header: true,
      });

      if (onChange) {
        onChange(e);
      }
    }
  };

  useEffect(() => {
    if (csvData.length > 0) {
      console.log(csvData);
    }
  });

  return (
    <div className="flex flex-col space-y-4">
      <label className="text-white semibold text-sm md:text-lg regular">
        {label}
      </label>
      <div
        className="bg-blue-card h-20 lg:h-[300px] w-full
      p-10 flex justify-center items-center rounded-[10px] relative overflow-y-auto flex-col"
      >
        <input
          type="file"
          className="absolute left-0 opacity-0 cursor-pointer top-0 w-full h-full"
          accept=".csv,.json,.xls"
          name={name}
          onChange={handleFileChange}
        />
        {csvData.length > 0 ? (
          <div className="text-white text-sm md:text-md regular text-center cursor-pointer w-full flex justify-center">
            <table className="table-auto border-collapse border border-white w-4/5 mx-auto text-white">
              <thead>
                <tr>
                  {/* Dynamically render the table headers */}
                  {Object.keys(csvData[0]).map((header, index) => (
                    <th key={index} className="border border-white px-4 py-2">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Dynamically render the table rows */}
                {csvData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((value: any, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="border border-white px-4 py-2"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-white text-sm md:text-md regular text-center cursor-pointer">
              Click to upload file(s)
            </p>
            <p className="text-grey-800 text-sm md:text-md regular text-center">
              CSV, JSON, XLS. Max 5mb.
            </p>
          </div>
        )}
      </div>
      {errMessage}
    </div>
  );
};

export default JsonFileInput;

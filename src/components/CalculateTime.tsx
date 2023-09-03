import { vehicles } from "@/data/data";
import {
  Period,
  period1,
  period2,
  period3,
  period4,
  period5,
  period6,
} from "@/data/periods";
import React, { useState } from "react";

interface ResultItem {
  [key: string]: string;
}

const Table: React.FC<{ mergedResult: ResultItem[] }> = ({ mergedResult }) => (
  <table>
    <thead>
      <tr>
        <th className="text-violet-500 font-bold">Number of vehicles sold</th>
        <th className="pl-24 text-violet-500 font-bold">
          Number of hours per week
        </th>
      </tr>
    </thead>
    <tbody>
      {mergedResult.map((entry, index) => (
        <tr key={index}>
          {Object.entries(entry).map(([key, value]) => (
            <React.Fragment key={key}>
              <td>{key}</td>
              <td className="pl-24 text-red-500">{String(value)}</td>
            </React.Fragment>
          ))}
        </tr>
      ))}
    </tbody>
  </table>
);

const CalculateTime: React.FC = () => {
  const originalData = vehicles;
  const interval = 15 * 60 * 1000;

  const [mergedResult1, setMergedResult1] = useState<ResultItem[]>([]);
  const [mergedResult2, setMergedResult2] = useState<ResultItem[]>([]);
  const [mergedResult3, setMergedResult3] = useState<ResultItem[]>([]);
  const [mergedResult4, setMergedResult4] = useState<ResultItem[]>([]);
  const [mergedResult5, setMergedResult5] = useState<ResultItem[]>([]);
  const [mergedResult6, setMergedResult6] = useState<ResultItem[]>([]);
  const [calculating, setCalculating] = useState(false);

  const processPeriodData = (
    period: Period[],
    setResultCallback: (result: ResultItem[]) => void
  ) => {
    const finalArray: any = {};

    period.forEach((periodObj, periodIndex) => {
      const arrayTime: any[] = [];
      let data = { ...originalData };

      while (Object.keys(data).length > 0) {
        let time = 0;

        for (
          let currentTime = new Date(periodObj.start).getTime();
          currentTime <= new Date(periodObj.end).getTime();
          currentTime += interval
        ) {
          let vehicleFound = false;

          for (const vehicleId in data) {
            const vehicleEntries = data[vehicleId];

            for (const entry of vehicleEntries) {
              const enterTime = new Date(entry.entertime).getTime();
              const exitTime = new Date(entry.exittime).getTime();

              if (currentTime >= enterTime && currentTime <= exitTime) {
                vehicleFound = true;
                break;
              }
            }

            if (vehicleFound) {
              break;
            }
          }

          if (!vehicleFound) {
            time += 0.25;
          }
        }

        const vehiclesSold = Object.keys(data).length - 1;
        const resultObject = {
          [`${vehiclesSold} Vehicle(s) sold`]: `${
            Number(time.toFixed(2)) > 0
              ? (time - 0.25).toFixed(2)
              : time.toFixed(2)
          } hours`,
        };

        arrayTime.push(resultObject);

        const keys = Object.keys(data);
        if (keys.length > 0) {
          delete data[keys[0]];
        }
      }

      finalArray[`period${periodIndex}`] = arrayTime;
    });

    const mergedArray: any[] = [];

    for (let i = 0; i < period.length; i++) {
      const periodKey = `period${i}`;
      const periodArray = finalArray[periodKey];

      if (periodArray) {
        periodArray.forEach((periodObj: any, index: number) => {
          if (!mergedArray[index]) {
            mergedArray[index] = {};
          }

          for (const key in periodObj) {
            if (!mergedArray[index][key]) {
              mergedArray[index][key] = 0;
            }

            const hours = parseFloat(periodObj[key]);
            mergedArray[index][key] += hours;
          }
        });
      }
    }

    setResultCallback(mergedArray);
    setCalculating(false);
  };

  const handleCalculateClick1 = () => {
    setCalculating(true);
    processPeriodData(period1, setMergedResult1);
  };

  const handleCalculateClick2 = () => {
    setCalculating(true);
    processPeriodData(period2, setMergedResult2);
  };

  const handleCalculateClick3 = () => {
    setCalculating(true);
    processPeriodData(period3, setMergedResult3);
  };

  const handleCalculateClick4 = () => {
    setCalculating(true);
    processPeriodData(period4, setMergedResult4);
  };

  const handleCalculateClick5 = () => {
    setCalculating(true);
    processPeriodData(period5, setMergedResult5);
  };
  const handleCalculateClick6 = () => {
    setCalculating(true);
    processPeriodData(period6, setMergedResult6);
  };

  return (
    <div>
      <button
        className="bg-blue-500 mb-4 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCalculateClick1}
        disabled={calculating}
      >
        Period 1 from "2023-05-31T20:30:00.000Z" to "2023-06-05T05:00:00.000Z"
      </button>
      <br />
      <button
        className="bg-violet-500 mb-4 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCalculateClick2}
        disabled={calculating}
      >
        Period 2 from "2023-06-05T20:30:00.000Z" to "2023-06-10T05:00:00.000Z"
      </button>
      <br />
      <button
        className="bg-orange-500 ml-5 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCalculateClick3}
        disabled={calculating}
      >
        Period 3 from "2023-06-10T20:30:00.000Z" to "2023-06-15T05:00:00.000Z"
      </button>
      <br />
      <button
        className="bg-green-500 ml-5 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCalculateClick4}
        disabled={calculating}
      >
        Period 4 from "2023-06-15T20:30:00.000Z" to "2023-06-20T05:00:00.000Z"
      </button>
      <br />
      <button
        className="bg-red-500 ml-5 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCalculateClick5}
        disabled={calculating}
      >
        Period 5 from "2023-06-20T20:30:00.000Z" to "2023-06-25T05:00:00.000Z"
      </button>
      <br />
      <button
        className="bg-gray-500 ml-5 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={handleCalculateClick6}
        disabled={calculating}
      >
        Period 6 from "2023-06-25T20:30:00.000Z" to "2023-06-30T05:00:00.000Z"
      </button>
      <br />
      <br />
      <div className="ml-5">
        {calculating ? <p>Calculating...</p> : null}
        <h1 className="text-2xl font-bold text--blue-500">Period 1 :</h1>
        <Table mergedResult={mergedResult1} />
        <h1 className="text-2xl font-bold text-violet-500">Period 2 :</h1>
        <Table mergedResult={mergedResult2} />
        <h1 className="text-2xl font-bold text-orange-500">Period 3 :</h1>
        <Table mergedResult={mergedResult3} />
        <h1 className="text-2xl font-bold text-green-500">Period 4 :</h1>
        <Table mergedResult={mergedResult4} />
        <h1 className="text-2xl font-bold text-red-500">Period 5 :</h1>
        <Table mergedResult={mergedResult5} />
        <h1 className="text-2xl font-bold text-gray-500">Period 6 :</h1>
        <Table mergedResult={mergedResult6} />
      </div>
    </div>
  );
};

export default CalculateTime;

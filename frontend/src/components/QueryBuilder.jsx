import React, { useState, useEffect } from "react";
import { Plus, Trash2, Table } from "lucide-react";
import { toast } from "sonner";

const OPERATORS = ["=", "!=", ">", "<", ">=", "<=", "LIKE", "IN"];

function getFieldByName(availableFields, fieldName) {
  return availableFields.find((f) => f.name === fieldName) || {};
}

export default function QueryBuilder({ metaData }) {
  const [objectName, setObjectName] = useState("");
  const [availableFields, setAvailableFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [filters, setFilters] = useState([]);
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [limit, setLimit] = useState(10);

  // State for backend data fetching
  const [isFetching, setIsFetching] = useState(false);
  const [reportData, setReportData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (objectName) {
      const fields = findAllReachableFields(objectName);
      setAvailableFields(fields);
    } else {
      setAvailableFields([]);
    }
  }, [objectName]);

  const findAllReachableFields = (startObject) => {
    const fields = [];
    const visited = new Set();
    const queue = [startObject];

    while (queue.length > 0) {
      const current = queue.shift();
      if (visited.has(current)) continue;
      visited.add(current);

      const obj = metaData[current];
      if (obj && obj.fields) {
        obj.fields.forEach((field) => {
          fields.push({
            name: field.name,
            objectName: current,
            dbColumn: field.dbColumn,
            alias: obj.alias,
            displayName: `${current}.${field.name}`,
          });
        });
      }

      if (obj && obj.joins) {
        obj.joins.forEach((join) => {
          if (!visited.has(join.target)) {
            queue.push(join.target);
          }
        });
      }
    }

    return fields;
  };

  const toggleField = (field) => {
    if (
      selectedFields.some(
        (f) => f.name === field.name && f.objectName === field.objectName
      )
    ) {
      setSelectedFields(
        selectedFields.filter(
          (f) => !(f.name === field.name && f.objectName === field.objectName)
        )
      );
    } else {
      setSelectedFields([...selectedFields, field]);
    }
  };

  // Add a filter with 'object' property along with field
  const addFilter = () => {
    setFilters([
      ...filters,
      { object: "", field: "", operator: "=", value: "" },
    ]);
  };

  const removeFilter = (index) => {
    setFilters(filters.filter((_, i) => i !== index));
  };

  // Handles updates of filter keys. If the user selects a field, set filter.object too.
  const updateFilter = (index, key, value) => {
    const newFilters = [...filters];
    if (key === "field") {
      const pick = getFieldByName(availableFields, value);
      newFilters[index].field = value;
      newFilters[index].object = pick.objectName || "";
    } else {
      newFilters[index][key] = value;
    }
    setFilters(newFilters);
  };

  // Handler for fetching data from backend, with new payload structure
  const fetchReportData = async () => {
    if (!objectName || selectedFields.length === 0) {
      alert("Please select an object and at least one field");
      return;
    }
    setIsFetching(true);
    setError(null);
    setReportData(null);

    // Structure fields as { object, field }
    const payloadFields = selectedFields.map((f) => ({
      object: f.objectName,
      field: f.name,
    }));

    // Structure filters
    const payloadFilters = filters
      .filter((f) => f.field && f.value)
      .map((f) => {
        // Backfill .object (just in case) if missing
        let objName = f.object;
        if (!objName) {
          const af = getFieldByName(availableFields, f.field);
          objName = af.objectName || "";
        }
        return {
          object: objName,
          field: f.field,
          operator: f.operator,
          value: f.value,
        };
      });

    // Structure sort: allow multiple sorts (as per spec). Here, only one sort.
    let payloadSort = [];
    if (sortField) {
      const sortPick = getFieldByName(availableFields, sortField);
      let objName = sortPick.objectName || "";
      payloadSort = [
        {
          object: objName,
          field: sortField,
          direction: sortOrder,
        },
      ];
    }

    const payload = {
      baseObject: objectName,
      fields: payloadFields,
      filters: payloadFilters,
      sort: payloadSort,
      limit,
    };

    console.log({ payload });
    toast("fetching data");

    // try {
    //   const resp = await fetch("/api/report/data", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(payload),
    //   });

    //   if (!resp.ok) {
    //     throw new Error("Failed to fetch data");
    //   }
    //   const data = await resp.json();
    //   setReportData(data);
    // } catch (err) {
    //   setError(err.message || "Unknown error");
    // } finally {
    //   setIsFetching(false);
    // }
  };

  return (
    <div className="min-h-screen bg-white text-black p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden">
          {/* Header */}
          <div className="bg-white border-b border-black/10 p-6">
            <h1 className="text-3xl font-bold text-black flex items-center gap-3">
              <Table className="w-8 h-8" color="black" />
              SQL Query Builder
            </h1>
            <p className="text-gray-700 mt-2">
              metaData-driven report builder system
            </p>
          </div>

          <div className="p-8 space-y-6">
            {/* Object Selection */}
            <div className="bg-white rounded-xl p-6 border border-black/10">
              <label className="block text-black font-semibold mb-3 text-lg">
                1. Select Root Object
              </label>
              <select
                value={objectName}
                onChange={(e) => {
                  setObjectName(e.target.value);
                  setSelectedFields([]);
                  setFilters([]);
                  setReportData(null);
                  setError(null);
                }}
                className="w-full bg-white border border-black/20 rounded-lg px-4 py-3 text-black focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="">-- Choose Object --</option>
                {Object.keys(metaData).map((obj) => (
                  <option key={obj} value={obj}>
                    {obj}
                  </option>
                ))}
              </select>
            </div>

            {/* Field Selection */}
            {objectName && (
              <div className="bg-white rounded-xl p-6 border border-black/10">
                <label className="block text-black font-semibold mb-3 text-lg">
                  2. Select Fields ({selectedFields.length} selected)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-64 overflow-y-auto p-2">
                  {availableFields.map((field, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${
                        selectedFields.some(
                          (f) =>
                            f.name === field.name &&
                            f.objectName === field.objectName
                        )
                          ? "bg-black/10 border-black"
                          : "bg-white border-black/10 hover:bg-black/5"
                      } border`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedFields.some(
                          (f) =>
                            f.name === field.name &&
                            f.objectName === field.objectName
                        )}
                        onChange={() => toggleField(field)}
                        className="w-4 h-4 accent-black"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-black font-medium truncate">
                          {field.name}
                        </div>
                        <div className="text-gray-600 text-xs truncate">
                          {field.displayName}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Filters */}
            {objectName && (
              <div className="bg-white rounded-xl p-6 border border-black/10">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-black font-semibold text-lg">
                    3. Add Filters (Optional)
                  </label>
                  <button
                    onClick={addFilter}
                    className="flex items-center gap-2 bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" color="white" />
                    Add Filter
                  </button>
                </div>

                <div className="space-y-3">
                  {filters.map((filter, idx) => (
                    <div
                      key={idx}
                      className="flex gap-3 items-center bg-black/5 p-3 rounded-lg"
                    >
                      <select
                        value={filter.field}
                        onChange={(e) =>
                          updateFilter(idx, "field", e.target.value)
                        }
                        className="flex-1 bg-white border border-black/20 rounded-lg px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        <option value="">-- Field --</option>
                        {availableFields.map((f, i) => (
                          <option key={i} value={f.name}>
                            {f.displayName}
                          </option>
                        ))}
                      </select>

                      <select
                        value={filter.operator}
                        onChange={(e) =>
                          updateFilter(idx, "operator", e.target.value)
                        }
                        className="bg-white border border-black/20 rounded-lg px-3 py-2 text-black text-sm focus:outline-none focus:ring-2 focus:ring-black"
                      >
                        {OPERATORS.map((op) => (
                          <option key={op} value={op}>
                            {op}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        value={filter.value}
                        onChange={(e) =>
                          updateFilter(idx, "value", e.target.value)
                        }
                        placeholder="Value"
                        className="flex-1 bg-white border border-black/20 rounded-lg px-3 py-2 text-black text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black"
                      />

                      <button
                        onClick={() => removeFilter(idx)}
                        className="bg-white border border-black px-2 py-2 rounded-lg hover:bg-black hover:text-white transition-colors"
                        style={{ lineHeight: 0 }}
                      >
                        <Trash2 className="w-4 h-4" color="black" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sort and Limit */}
            {objectName && (
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 border border-black/10">
                  <label className="block text-black font-semibold mb-3">
                    4. Sort By (Optional)
                  </label>
                  <div className="flex gap-3">
                    <select
                      value={sortField}
                      onChange={(e) => setSortField(e.target.value)}
                      className="flex-1 bg-white border border-black/20 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="">-- No Sort --</option>
                      {availableFields.map((f, i) => (
                        <option key={i} value={f.name}>
                          {f.displayName}
                        </option>
                      ))}
                    </select>

                    <select
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                      className="bg-white border border-black/20 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                    >
                      <option value="asc">ASC</option>
                      <option value="desc">DESC</option>
                    </select>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-black/10">
                  <label className="block text-black font-semibold mb-3">
                    5. Limit Results
                  </label>
                  <input
                    type="number"
                    value={limit}
                    onChange={(e) => setLimit(parseInt(e.target.value) || 100)}
                    className="w-full bg-white border border-black/20 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>
            )}

            {/* Fetch/Add Button */}
            {objectName && (
              <div className="flex gap-4">
                <button
                  onClick={fetchReportData}
                  disabled={isFetching}
                  className="flex-1 flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-800 text-white px-6 py-4 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isFetching ? <span>Fetching...</span> : <>GetData</>}
                </button>
              </div>
            )}

            {/* Fetch result/error display */}
            {reportData && (
              <div className="bg-gray-100 rounded-xl p-6 border border-black/10 mt-6">
                <div className="font-semibold text-black mb-2">
                  Fetched Data
                </div>
                <pre className="text-gray-800 text-sm overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed max-h-80">
                  {JSON.stringify(reportData, null, 2)}
                </pre>
              </div>
            )}
            {error && (
              <div className="text-red-600 mt-4 font-semibold">
                Error: {error}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

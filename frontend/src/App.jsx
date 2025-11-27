import { useEffect } from "react";
import QueryBuilder from "./components/QueryBuilder";
import { useState } from "react";
import apiRoutes from "./utils/apiRoutes";
import { toast, Toaster } from "sonner";
import axios from "axios";

function App() {
  const [metaData, setMetaData] = useState({});

  async function fetchMetaData() {
    try {
      const { data } = await axios(apiRoutes.metaDataURL);
      setMetaData(data);
    } catch (error) {
      toast(error.message);
    }
  }

  useEffect(() => {
    fetchMetaData();
  }, []);
  return (
    <div>
      <QueryBuilder metaData={metaData} />
      <Toaster />
    </div>
  );
}

export default App;

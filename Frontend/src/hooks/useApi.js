import { useEffect, useState } from "react";

export const useApi = (url) => {
  const [db, setDb] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    
    setLoading(true);

    const getInfoDb = async () => {
      try {
        const res = await fetch(url);
        const data= await res.json()
        setDb(data);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    };
    if (url) {
      getInfoDb();
    } else {
      setDb(null);
    }
  }, [url]);



  const createData = async (data) => {
    const dataStringify =JSON.stringify(data)

    const options={
      method : "POST",
      body: dataStringify,
      headers: { "content-type": "application/json" }
    }

    try {
      const res = await fetch(url,options)
      const newData= await res.json()
      if (res.ok) {
        console.log("Correcto");
        setDb([...db, newData]);
      }
    } catch (error) {
      setError(error.message);
    }finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
    
  };



  const deleteData = async (id) => {
    let endpoint = `${url}/${id}`;

    const options={
      method : "DELETE",
      headers: { "content-type": "application/json" },
    }

    try {
      const res = await fetch(endpoint,options)
      if (res.ok) {
        let newData = db.filter((el) => el.id !== id)
        console.log("Borrando");
        setDb(newData);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };


  const updateData = async (data) => {
    let endpoint = `${url}/${data.id}`;
    const dataStringify =JSON.stringify(data)

    const options={
      method : "PUT",
      body: dataStringify,
      headers: { "content-type": "application/json" },
    }
    try {
      const res = await fetch(endpoint,options)
      if (res.ok) {
        let newData = db.map((el) => (el.id === data.id ? data : el));
        setDb(newData);
        setError(null);
      }
    } catch (error) {
      setError(error.message);
    }finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return {
    db,
    createData,
    updateData,
    deleteData,
    error,
    loading,
  };
};

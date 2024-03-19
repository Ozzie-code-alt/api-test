"use client";
import { useEffect, useState } from "react";

interface NasaResponse {
  explanation?: string;
  copyright?: string;
  title?: string;
  url?: string;
}
interface EarthDataResponse {
  date?: string;
  id?: string;
  url?: string;
}
export default function Home() {
  const [datas, setData] = useState<NasaResponse>([]);
  const [earthData, setEarthData] = useState <EarthDataResponse | null>([]);



  useEffect(() => {
    const fetchData = async () => {
      const nasaData = await fetch("/api/getNasa");
      if (!nasaData.ok) {
        throw new Error(
          `API call failed with status: ${nasaData.status} ${nasaData.statusText}`
        );
      }
      const jsonResponse = await nasaData.json();
      console.log("Raw JSON Response:", jsonResponse);
      setData(jsonResponse.response); 
    };



    fetchData();
   

  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const lat = formData.get('lat');
    const lon = formData.get('lon');
    const date = formData.get('date')

    

    const earthDataResponse = await fetch("/api/earthAPI", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ lat: parseFloat(lat), lon: parseFloat(lon), date: date }),
    }); 
    if (earthDataResponse.ok) {
      const jsonResponse = await earthDataResponse.json();
      setEarthData(jsonResponse);
    } else {
      console.error('Failed to fetch Earth data');
    }
  }
  


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {datas ? (
        <>
          <p className="text-black">{datas.explanation}</p>
          <p className="text-black">{datas.copyright}</p>
          <p className="text-black">{datas.title}</p>
          <img src={datas.url} alt={datas.title || "NASA image"} />
        </>
      ) : (
        <p>Loading...</p>
      )}

      <div className="  flex ">
         <form className="flex flex-col" onSubmit={handleSubmit}>
          <label >
            Latitude:
            <input type="text" className="border border-black" name="lat" />
          </label>
          <label>
            Longitude:
            <input type="text" className="border border-black" name="lon" />
          </label>
          <label>
            Date:
            <input type="text" className="border border-black" name="date" />
          </label>
          <input type="submit" className="border border-black" value="Submit" />
         </form>

      </div>

      <div>
        {earthData ? (
          <>
            <p className="text-black">{earthData.date}</p>
            <p className="text-black">{earthData.id}</p>
            <p className="text-black">{earthData.url}</p>

            <img src={earthData.url} alt={earthData.id || "NASA image"} />
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </main>
  );
}

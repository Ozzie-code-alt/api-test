import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
export const GET = async (req:NextApiRequest) => {   
    const { lat, lon, date, dim = '0.10' } = req.json();
    const baseUrl = "https://api.nasa.gov/planetary/earth/assets";
    const apiKey = "QzHHYbldfw4r0iwlYnOHBjsoo2wX0wO6offwaUcm"; // You should secure your API key
    const url = `${baseUrl}?lon=${lon}&lat=${lat}&date=${date}&dim=${dim}&api_key=${apiKey}`;
    // const responesEarth = await fetch("https://api.nasa.gov/planetary/earth/assets?lon=-95.33&lat=29.78&date=2018-01-01&&dim=0.10&api_key=QzHHYbldfw4r0iwlYnOHBjsoo2wX0wO6offwaUcm").then((res) => res.json());   // Fetch data from NASA API then convert to json
    const responseEarth = await fetch(url).then((res) => res.json());
    console.log(responseEarth)
    return NextResponse.json({responseEarth});  // Return the response to the client

}


export const POST = async (req) => {
    const { lat, lon, date } = await req.json();
    console.log(lat, lon, date,)
    console.log("BAC Information Sent")
    return NextResponse.json({message:"Earth Information Sent it work now"}, {status:201})

}
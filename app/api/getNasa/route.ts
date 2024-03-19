
import { NextResponse } from "next/server";

export async function GET() {
const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=QzHHYbldfw4r0iwlYnOHBjsoo2wX0wO6offwaUcm").then((res) => res.json());
console.log(typeof(response), "it works")
return NextResponse.json({response});
}


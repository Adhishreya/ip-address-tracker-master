import "./styles.css";
import React,{useState,useEffect} from "react";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
export default function App() {
  const [ip,setIp]=useState("");
  const [loc,setLoc]=useState("");
  const [utc,setUtc]=useState("");
  const [isp,setIsp]=useState("");
  const [lat,setLat]=useState( 34.04915);
  const [long,setLong]=useState(-118.09462);
  const [input,setInput]=useState("192.212.174.101");
  useEffect(()=>{
    const loading =async()=>
    {
     await axios('') 
    }
  });
  const position=[lat,long]
  return (
  <div className="App">
    <div className="heading"> IP Address Tracker</div>
    <div className="top-input-area">
      <input placeholder="Search for any IP address or domain"/>
      <button type="submit"></button>
    </div> 
    <div className="grid">
      <div><span>IP Address</span><span className="ip">{ip}</span></div>
      <div><span>Location</span><span className="loc">{loc}</span></div>
      <div><span>Timezone</span><span className="utc">UTC -{utc}</span></div>
      <div><span>ISP</span><span className="isp">{isp}</span></div>  
    </div>
    <div id="mapid" >
    <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={position}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
    </div>
  </div>
  );
}

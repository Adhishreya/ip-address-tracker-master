import "./styles.css";
import React,{useState,useEffect} from "react";
import axios from "axios";
// import 'leaflet/dist/leaflet.css';
// import marker-icon from './images/pattern-bg.png';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
export default function App() {
  const [ip,setIp]=useState("192.212.174.101");
  const [loc,setLoc]=useState("");
  const [utc,setUtc]=useState("");
  const [isp,setIsp]=useState("");
  const [lat,setLat]=useState( 34.04915);
  const [long,setLong]=useState(-118.09462);
  const [input,setInput]=useState("");
  const [error,setError] = useState(false); 
  useEffect(()=>{
    const loading =async()=>
    {
     console.log(ip);
    const url = "https://geo.ipify.org/api/v1?apiKey=at_Olt59VNzhOKJ6nzHEyE0s5bJElxdJ&ipAddress="+ip;
    //  const results = await axios('url') ;
    try{

      const {data:{isp,location:{lat,lng,timezone,city,country}}} = await axios(url);
      console.log(lat,lng,isp);
      setLat(Number(lat));
      setLong(Number(lng));
      setIsp(isp);
      setUtc(timezone);
      setLoc(city+" , "+country);
      setError(false);
      // console.log(await axios(url));
      
    }
    catch(error)
    {
        console.log("error")
        setError(true);
    }
    }

    loading();
  },[ip,input]);
  // const position=
  return (
  <div className="App"> 
    <div className="heading"> IP Address Tracker</div>
    <div className="top-input-area">
      <input placeholder="Search for any IP address or domain" onChange={e=>{setInput(e.target.value);
      }}/>
      <button  onClick={()=>{
            if(input.length>0)
            {
              setIp(input);
            }
            else
            {
              setIp("192.212.174.101");
            }
      }}></button>
    </div> 
    <div className="grid">
      <div><span>IP Address</span><span className="ip">{ip}</span></div>
      <div><span>Location</span><span className="loc">{loc}</span></div>
      <div><span>Timezone</span><span className="utc">UTC {utc}</span></div>
      <div><span>ISP</span><span className="isp">{isp}</span></div>  
    </div>

        <div id="mapid" style={{width:"30rems", height:"580px"}} >
        <MapContainer center={[lat,long]} zoom={10} scrollWheelZoom={false}>
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat,long]}  className="pop-up">
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
        </div>

  </div>
  );
}

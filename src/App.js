import "./styles.css";
import React,{useState,useEffect} from "react";
import axios from "axios";
import L from 'leaflet';
import imageMarker from './images/icon-location.svg';
// import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup,useMap } from 'react-leaflet';

function MyComponent({lat,long}) {
  const map = useMap()
  console.log(lat)
  // console.log('map center:', map.getCenter())
  map.setView([lat,long])

  return null
}

export default function App() {
  const [ip,setIp]=useState("");
  const [loc,setLoc]=useState("");
  const [utc,setUtc]=useState("");
  const [isp,setIsp]=useState("");
  const [lat,setLat]=useState( 34.04915);
  const [long,setLong]=useState(-118.09462);
  const [input,setInput]=useState("");
  const [error,setError] = useState(false); 

  var myIcon = L.icon({
    iconUrl: imageMarker,
    iconSize: [25, 40],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
});

  useEffect(()=>{
    const loading =async()=>
    {
      // const context = useLeafletContext();//to get the context created by mapContainer component

     console.log(ip);
    const url = "https://geo.ipify.org/api/v1?apiKey=at_Olt59VNzhOKJ6nzHEyE0s5bJElxdJ&ipAddress="+ip;
    //  const results = await axios('url') ;
    try{

      const {data:{ip,isp,location:{lat,lng,timezone,city,country}}} = await axios(url);
      console.log(lat,lng,isp);
      setIp(ip);
      setLat(Number(lat));
      setLong(Number(lng));
      setIsp(isp);
      setUtc(timezone);
      setLoc(city+" , "+country);
      setError(false);      
    }
    catch(error)
    {
        console.log("error")
        setError(true);
    }
    }

    loading();
  },[ip,input]);
  if(input.length==0)
  {
    
  }
  return (
  <div className="App"> 
  {/* <input placeholder="lat" onChange={(e)=>setLat(e.target.value)}/> */}
  {/* <input placeholder="long" onChange={(e)=>setLong(e.target.value)}/> */}
    <h1 className="heading"> IP Address Tracker</h1>
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
              setIp("");

            }
      }}></button>
    </div> 
   

        <div id="mapid" style={{}} >
        <MapContainer center={[lat,long]} zoom={13} scrollWheelZoom={false}>
        <TileLayer
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat,long]}  className="pop-up" icon={myIcon}>
          <MyComponent lat={lat} long={long}/>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
        </div>
        <div className="grid">
      <div><span>IP Address</span><h2 className="ip">{ip}</h2></div>
      <div><span>Location</span><h2 className="loc">{loc}</h2></div>
      <div><span>Timezone</span><h2 className="utc">UTC {utc}</h2></div>
      <div><span>ISP</span><h2 className="isp">{isp}</h2></div>  
    </div>
  </div>
  );
}

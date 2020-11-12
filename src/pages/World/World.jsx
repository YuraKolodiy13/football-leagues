import React, {useEffect} from "react";
import { Map, TileLayer, Polygon, ZoomControl } from 'react-leaflet';
import {getCountriesBordersRequest} from "../../actions/leagues";
import {useDispatch, useSelector} from "react-redux";
import Loader from "../../components/Loader/Loader";
import './World.scss'

const World = () => {

  const dispatch = useDispatch();
  const loading = useSelector(state => state.leagues.loading);
  const features = useSelector(state => state.leagues.features);

  const reverseLatLng = (arr) => {
    let arrRev=arr.map(el=>[...el].reverse());
    return arrRev;
  };

  useEffect(() => {
    dispatch(getCountriesBordersRequest());
  }, [dispatch]);

  if(loading) return <Loader/>;

  return (
    <div>
      <h1>world</h1>

      <Map
        zoomSnap={0.25}
        zoom={5}
        maxZoom={50}
        attributionControl={true}
        zoomControl={false}
        doubleClickZoom={true}
        scrollWheelZoom={true}
        dragging={true}
        easeLinearity={0.35}
        center={{ lat: 49.83805, lng: 24.0610 }}
      >
        <ZoomControl position="bottomleft"/>
        <TileLayer
          url={`http://{s}.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}`}
          subdomains={['mt0','mt1','mt2','mt3']}
        />
        {
          features.map((multiPoligon,i)=>{
            return multiPoligon.geometry.coordinates.map((poliPoligon,j)=>{
              return poliPoligon.map((poligon,z)=>{
                return <Polygon
                  // className={`${selectedRoutes.includes(multiPoligon.properties.zipcrid)? 'active' : ''}`} //reactive all selected routes after switch from table
                  key={`${i}-${j}-${z}`}
                  color="#f00"
                  fillOpacity={`0.2`}
                  weight="1"
                  positions={reverseLatLng(poligon)}
                  // onClick={(e)=>(handlePoligonClick(e, multiPoligon.properties.zipcrid, false, multiPoligon.properties))}
                  // onMouseover={ (e)=>(handlePoligonMouseOver(e,multiPoligon.properties)) }
                  // onMouseout={ (e)=>(handlePoligonMouseOut(e)) }
                />
              })
            })
          })
        }
      </Map>
    </div>
  )
};

export default World;
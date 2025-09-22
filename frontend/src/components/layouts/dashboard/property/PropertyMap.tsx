"use client";

import Map, { Marker, MapMouseEvent, ViewState } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";

type Props = {
  viewState: ViewState;
  setViewState: (v: ViewState) => void;
  latitude: string;
  longitude: string;
  onSelect: (lat: number, lng: number) => void;
  userLocation: { latitude: number; longitude: number } | null;
};

export default function PropertyMap({
  viewState,
  setViewState,
  latitude,
  longitude,
  onSelect,
  userLocation,
}: Props) {
  const handleClick = (event: MapMouseEvent) => {
    const { lngLat } = event;
    onSelect(lngLat.lat, lngLat.lng);
    setViewState({
      ...viewState,
      latitude: lngLat.lat,
      longitude: lngLat.lng,
      padding: viewState.padding,
    });
  };

  return (
    <div className="h-96 w-full">
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        onClick={handleClick}
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        mapStyle="mapbox://styles/ariska-adi/cme5oy58001a501s80a2icsqi"
        style={{ width: "100%", height: "100%" }}>
        {latitude && longitude && (
          <Marker
            latitude={parseFloat(latitude)}
            longitude={parseFloat(longitude)}
            anchor="center">
            <div className="flex items-center justify-center">
              <div className="animate-ping absolute h-5 w-5 rounded-full bg-red-400 opacity-50"></div>
              <div className="relative h-5 w-5 rounded-full bg-red-500 border-2 border-white"></div>
            </div>
          </Marker>
        )}
        {userLocation && (
          <Marker
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
            anchor="bottom">
            <div className="flex flex-col items-center space-y-1">
              <span className="px-2 py-1 text-xs bg-blue-500 text-white shadow-md rounded-md border font-bold">
                Your location here
              </span>
              <div className="flex items-center justify-center">
                <div className="animate-ping absolute h-4 w-4 rounded-full bg-blue-400 opacity-50"></div>
                <div className="relative h-4 w-4 rounded-full bg-blue-500 border-2 border-white"></div>
              </div>
            </div>
          </Marker>
        )}
      </Map>
    </div>
  );
}

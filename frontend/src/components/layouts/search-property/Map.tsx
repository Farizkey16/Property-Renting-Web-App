"use client";

import Map, { Marker, Popup } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import React, { useState, useEffect } from "react";
import { FaHome } from "react-icons/fa";
import Image from "next/image";

type Room = {
  id: string;
  name: string;
  description: string;
  capacity: number;
  base_price: number;
  total_rooms: number;
  image?: string;
};

type Property = {
  id: string;
  name: string;
  address: string;
  city: string;
  province: string;
  description: string;
  latitude: string;
  longitude: string;
  distance: number;
  main_image?: string;
  property_category: string;
  rooms: Room[];
};

interface MapPagesProps {
  children?: React.ReactNode; // ✅ bukan function lagi
  properties: Property[];
  checkIn?: string;
  checkOut?: string;
}

const MapPages: React.FC<MapPagesProps> = ({ children, properties }) => {
  const [viewState, setViewState] = useState({
    longitude: 112.58335,
    latitude: -8.1190028,
    zoom: 13,
  });

  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null
  );

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ latitude, longitude });
          setViewState((prev) => ({ ...prev, latitude, longitude }));
        },
        () => {
          setUserLocation({ latitude: -8.1190028, longitude: 112.58335 });
        }
      );
    }
  }, []);

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-full overflow-x-hidden">
      {/* Map Section */}
      <div className="w-full lg:flex-1 relative p-2">
        <div className="h-[300px] md:h-[400px] lg:h-[500px] rounded-xl overflow-hidden shadow">
          <Map
            {...viewState}
            onMove={(evt) => setViewState(evt.viewState)}
            mapStyle="mapbox://styles/ariska-adi/cmetwjjft000501s98r0t28p6"
            mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
            style={{ width: "100%", height: "100%" }}>
            {userLocation && (
              <Marker
                latitude={userLocation.latitude}
                longitude={userLocation.longitude}
                anchor="center">
                <div className="relative w-4 h-4">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75 animate-ping"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
                </div>
              </Marker>
            )}

            {properties.map((p) => (
              <Marker
                key={p.id}
                latitude={Number(p.latitude)}
                longitude={Number(p.longitude)}
                anchor="bottom"
                onClick={() => setSelectedProperty(p)}>
                <div className="w-8 h-8 flex items-center justify-center z-50">
                  <FaHome className="text-blue-600 bg-white rounded-full p-1 shadow-md w-6 h-6 cursor-pointer" />
                </div>
              </Marker>
            ))}

            {selectedProperty && (
              <Popup
                latitude={Number(selectedProperty.latitude)}
                longitude={Number(selectedProperty.longitude)}
                anchor="top"
                closeOnClick={false}
                onClose={() => setSelectedProperty(null)}>
                <div className="text-sm space-y-2 max-w-xs">
                  <h4 className="font-semibold">{selectedProperty.name}</h4>
                  <p className="text-gray-600">{selectedProperty.address}</p>
                  <p className="text-xs text-gray-500">
                    {selectedProperty.distance.toFixed(2)} km away
                  </p>
                  {selectedProperty.main_image && (
                    <Image
                      src={selectedProperty.main_image}
                      alt={selectedProperty.name}
                      width={300}
                      height={150}
                      className="w-full h-24 object-cover rounded-md"
                    />
                  )}
                </div>
              </Popup>
            )}
          </Map>
        </div>
      </div>

      {/* Sidebar / Children */}
      {children && (
        <div className="w-full lg:w-[420px] bg-white border-t lg:border-t-0 lg:border-l flex flex-col lg:h-[500px] max-w-full">
          <div className="flex-1 overflow-y-auto p-4">{children}</div>
        </div>
      )}
    </div>
  );
};

export default MapPages;

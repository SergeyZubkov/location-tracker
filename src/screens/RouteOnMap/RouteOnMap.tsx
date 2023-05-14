import { useState } from "react";
import useLocation, { ILocation } from "../../hooks/useLocation";
const RouteOnMap = () => {
  const [, setLocationCoords] = useState<ILocation["coords"][]>([]);
  useLocation(true, (location) =>
    setLocationCoords((coords) => [
      ...coords,
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      },
    ])
  );

  return null;
};

export default RouteOnMap;

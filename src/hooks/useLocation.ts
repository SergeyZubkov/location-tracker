import {
  requestForegroundPermissionsAsync,
  Accuracy,
  watchPositionAsync,
} from "expo-location";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { error } from "../i18n/constants/common.translation";
import { LocationSubscription } from "expo-location/src/Location.types";
import { handleError } from "../utils/error.utils";

export interface ILocation {
  coords: { latitude: number; longitude: number };
  timestamp: number;
}

const useLocation = (
  shouldTrack: boolean,
  callback: (location: ILocation) => void
) => {
  const [err, setErr] = useState<string | null>(null);
  const { t } = useTranslation();

  useEffect(() => {
    let subscriber: LocationSubscription | undefined;

    const startWatch = async () => {
      try {
        await requestForegroundPermissionsAsync();
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            distanceInterval: 10,
            timeInterval: 1000,
          },
          callback
        );
      } catch (e) {
        handleError(e);
        setErr(t(error));
      }
    };

    if (shouldTrack) {
      startWatch();
    } else {
      subscriber?.remove();
      subscriber = undefined;
    }

    return () => {
      subscriber?.remove();
    };
  }, [shouldTrack, callback]);

  return [err];
};

export default useLocation;

export interface ItineraryProps {
  lineId: string;
  name: string;
  code: string;
  coords: {
    lat: string;
    lng: string;
  }[];
}

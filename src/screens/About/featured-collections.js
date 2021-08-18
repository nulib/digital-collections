import iranianCinema from "../../images/feature-box-collection-iranian-cinema-550x310.jpg";
import colonialism from "../../images/feature-box-collection-colonialism-550x310.jpg";
import bursarsOffice from "../../images/feature-box-collection-bursars-office-550x310.jpg";
import cassas from "../../images/feature-box-collection-cassas-550x310.jpg";
import roadTrip from "../../images/feature-box-collection-road-trip2-550x310.png";
import wwII from "../../images/feature-box-collection-wwII-550x310.jpg";
import { productionIds } from "../../services/global-vars";

export const featuredCollections = [
  {
    description: "Posters depicting the social history of Iranian cinema.",
    id: productionIds.hamidNaficy,
    image: iranianCinema,
    label: "Hamid Naficy Iranian Movie Posters Collection",
  },
  {
    description: `Photographs representing colonialism in East Africa over the span
    of 100 years.`,
    id: productionIds.vernonMcKay,
    image: colonialism,
    label: "Vernon McKay Photographs",
  },
  {
    description: `Images documenting the 1968 takeover of the Northwestern University Bursar's office.`,
    id: productionIds.bursarsOffice,
    image: bursarsOffice,
    label: "Records of the Bursar’s Office Takeover, May 1968",
  },
  {
    description: "US Government posters from WWII.",
    id: productionIds.wpa,
    image: wwII,
    label: "World War II Poster Collection at Northwestern University Library",
  },
  {
    description: "Late sketches from modernist artist Ramón Casas.",
    id: productionIds.ramonCasas,
    image: cassas,
    label: "Ramón Casas sketchbooks",
  },
  {
    description: `Photographs from a 1915 road trip from Iowa to the Panama-Pacific
    exposition.`,
    id: productionIds.kateAndLou,
    image: roadTrip,
    label: "Kate and Lou. Souvenir of auto trip to San Francisco, 1915",
  },
];

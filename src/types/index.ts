export interface HowToReach {
  byAir: string;
  byTrain: string;
  byRoad: string;
}

export interface VipDarshan {
  available: boolean;
  ticketTypes: string[];
  prices: string[];
  bookingInfo: string;
  timings: string;
}

export interface Temple {
  id: string;
  name: string;
  nameHindi: string;
  city: string;
  state: string;
  deity: string;
  description: string;
  history: string;
  architecture: string;
  yearBuilt: string;
  timings: string;
  bestTimeToVisit: string;
  howToReach: HowToReach;
  dosAndDonts: string[];
  vipDarshan?: VipDarshan;
  category: ('jyotirlinga' | 'shaktiPeetha' | 'charDham' | 'prachin')[];
}

export interface State {
  id: string;
  name: string;
  cities: string[];
  templeCount: number;
}

export interface Jyotirlinga extends Temple {
  jyotirlingaNumber: number;
  story: string;
  significance: string;
}

export interface ShaktiPeetha {
  id: string;
  name: string;
  nameHindi: string;
  location: string;
  city: string;
  state: string;
  deityName: string;
  bhairavaName: string;
  bodyPart: string;
  story: string;
  significance: string;
  howToReach: HowToReach;
  timings: string;
  bestTimeToVisit: string;
  dosAndDonts: string[];
}

export interface CharDham {
  id: string;
  name: string;
  nameHindi: string;
  location: string;
  city: string;
  state: string;
  deity: string;
  story: string;
  significance: string;
  howToReach: HowToReach;
  dosAndDonts: string[];
  vipDarshan?: VipDarshan;
  timings: string;
  bestTimeToVisit: string;
}

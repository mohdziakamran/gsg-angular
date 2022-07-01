export interface BusListResponse {
    buses: Bus[];
}

export interface Bus {
    busName: string;
    busNumber: string;
    totalSeat: number;
    startBusStop: string;
    departureTime: string;
    busRoutes: BusRoute[];
    sunday: boolean;
    monday: boolean;
    tuesday: boolean;
    wednesday: boolean;
    thursday: boolean;
    friday: boolean;
    saturday: boolean;
}

export interface BusRoute {
    busStop: string;
    fares: number[];
    travelDuration: string;
}
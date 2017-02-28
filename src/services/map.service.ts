import {Injectable} from "@angular/core";

// declare google to suppress name errors
declare let google: any;

@Injectable()
export class MapService {

    public drawLocationMap(latitude: number, longitude: number, map_canvas_id: string): void {

        // create a new topo map
        let map = new google.maps.Map(document.getElementById(map_canvas_id), {
            zoom: 13,
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeId: google.maps.MapTypeId.TERRAIN
        });

        let marker = new google.maps.Marker({
            position: new google.maps.LatLng(latitude, longitude),
            title: latitude + " " + longitude
        });

        marker.setMap(map);
    }

}

import {Injectable} from '@angular/core';
import {Result} from '../lib/result';

// declare google to suppress name errors
declare let google: any;

@Injectable()
export class MapService {

  public drawAllLocationsMap(locations: Result[], map_canvas_id: string): void {

    // create a new map
    let map = new google.maps.Map(document.getElementById(map_canvas_id), {
      zoom: 6,
      center: new google.maps.LatLng(45.856, -93.214), // Minnesota
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    // popups that show when hovering over marker
    let infowindow = new google.maps.InfoWindow();
    let showInfoWindow = (chartData: any[], marker: any) => {
      return () => {
        infowindow.setContent("" + "<p><strong>" + chartData[0] + "</strong><br />" + chartData[1] + "<br />" + chartData[2] + " " + chartData[3] + "</p>");
        infowindow.maxWidth = 200;
        infowindow.open(map, marker);
        return true;
      };
    };

    // copy data for info windows into a separate array
    let chartData = [];
    let i: any;
    for (i in locations) {
      chartData.push(
        [locations[i].location_name,
          locations[i].county_name + ' County, ' + locations[i].state_code,
          locations[i].latitude,
          locations[i].longitude]);
    }

    // put markers on map
    let j: any;
    for (j in chartData) {
      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(chartData[j][2], chartData[j][3]),
        map: map
      });
      google.maps.event.addListener(marker, 'mouseover', showInfoWindow(chartData[j], marker));
    }
  }

  public drawLocationMap(latitude: number, longitude: number, map_canvas_id: string): void {

    // create a new topo map
    let map = new google.maps.Map(document.getElementById(map_canvas_id), {
      zoom: 13,
      center: new google.maps.LatLng(latitude, longitude),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    let marker = new google.maps.Marker({
      position: new google.maps.LatLng(latitude, longitude),
      title: latitude + ' ' + longitude
    });

    marker.setMap(map);
  }

}

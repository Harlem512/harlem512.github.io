import '../leaflet.css'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import roomMeta from './meta.json'

// L.Icon.Default.imagePath = 'img/icon/';

type Coords = [number, number]

// #MARK: RasterCoords
/**
 * leaflet plugin for plain image map projection
 * @copyright 2016- commenthol
 * @license MIT
 */
class RasterCoords {
  map
  width
  height
  tilesize
  zoom

  /**
   *
   * @param map A leaflet map
   * @param imgsize [x,y] dimensions of the base image
   * @param tilesize Size of tiles, default 256
   */
  constructor(map: L.Map, imgsize: Coords, tilesize?: number) {
    this.map = map
    this.width = imgsize[0]
    this.height = imgsize[1]
    this.tilesize = tilesize || 256
    this.zoom = this.zoomLevel()
    if (this.width && this.height) {
      this.setMaxBounds()
    }
  }

  zoomLevel() {
    return Math.ceil(
      Math.log(Math.max(this.width, this.height) / this.tilesize) / Math.log(2)
    )
  }
  /**
   * unproject `coords` to the raster coordinates used by the raster image projection
   * @param {Array} coords - [ x, y ]
   * @return {L.LatLng} - internal coordinates
   */
  unproject(coords: Coords | L.Point) {
    return this.map.unproject(coords, this.zoom)
  }
  /**
   * project `coords` back to image coordinates
   * @param {Array} coords - [ x, y ]
   * @return {L.LatLng} - image coordinates
   */
  project(coords: Coords) {
    return this.map.project(coords, this.zoom)
  }
  /**
   * sets the max bounds on map
   */
  setMaxBounds() {
    this.map.setMaxBounds(this.getMaxBounds())
  }
  /**
   * Gets the max bounds of the map
   */
  getMaxBounds() {
    var southWest = this.unproject([0, this.height])
    var northEast = this.unproject([this.width, 0])
    return new L.LatLngBounds(southWest, northEast)
  }
}

// #MARK: Map Definition

// build map
const map = L.map('map', {
  center: [1000, 1000],
  zoom: 3,
  zoomControl: true,
  maxBoundsViscosity: 1,
})

const img: Coords = [45840, 27600] as const
// generate raster coordinates
const rasterCoords = new RasterCoords(map, img)

// add tiles
// files://path/to/{z}/{x}/{y}.png
L.tileLayer('https://raw.githubusercontent.com/Harlem512/rm-map/refs/heads/main/tiles/{z}/{x}/{y}.png', {
  attribution:
    "<a href='https://www.rustedmossgame.com/' target='_blank'>Rusted Moss</a> interactive map, a <a href='/' target='_blank'>Harlem512 Production</a>",
  noWrap: true,
  minZoom: 0,
  maxNativeZoom: 8,
  bounds: rasterCoords.getMaxBounds(),
}).addTo(map)

// #MARK: Map layers

const popup = L.popup()

// Room Borders
const roomBorder = L.layerGroup()
for (const room of roomMeta) {
  L.rectangle(
    L.latLngBounds(
      rasterCoords.unproject([room.x1, room.y1]),
      rasterCoords.unproject([room.x2, room.y2])
    ),
    {
      color: room.color,
      weight: 1,
    }
  )
    .addTo(roomBorder)
    .bindPopup(popup)
    .addEventListener('click', () =>
      popup.setContent(
        `${room.room_name} (${room.room_id})<br>[${room.map_x},${room.map_y}]`
      )
    )
}
map.addLayer(roomBorder)

L.control
  .layers(
    {},
    {
      Rooms: roomBorder,
    }
  )
  .addTo(map)

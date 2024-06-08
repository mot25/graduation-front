declare namespace YandexMap {
  interface PointProps {
    readonly lat: number;
    readonly lon: number;
  }

  interface PolygonPropertiesProps {
    readonly fill: string;
    readonly stroke: string;
    readonly fillOpacity: number;
    readonly strokeWidth: string;
  }

  interface PolygonProps {
    fillColor?: string;
    strokeColor?: string;
    strokeWidth?: number;
    zIndex?: number;
    onPress?: () => void;
    points: PointProps[];
    innerRings?: PointProps[][];
    children?: undefined;
  }

  interface CameraPosition {
    zoom: number;
    tilt: number;
    azimuth: number;
    point: Point;
    finished: boolean;
  }

  interface MarkerProps {
    children?: React.ReactElement;
    zIndex?: number;
    scale?: number;
    onPress?: () => void;
    point: PointProps;
    source?: ImageSourcePropType;
    anchor?: { x: number; y: number };
  }
}

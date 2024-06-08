import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import YaMap, { Marker } from 'react-native-yamap';
import { MarkerMapEvents } from '../entities/MarkerMapEvents';
import { useBottomSheetContext } from '../features/bottom-sheet/BottomSheetContext';
import { ControllerMap } from '../features/ControllerMap';
import { InputSearch } from '../features/InputSearch';
import { MarkerTypes } from '../shared/types/MapTypes';
import { EVENTS_BOTTOM_SHEET_TYPE } from '../widgets/BottomSheet/EventsBottomSheet';

const userIcon =
  'https://avatars.dzeninfra.ru/get-zen_doc/1658683/pub_64fd7c69b285002437bcdf21_64fd7d342dffe65d9833b9ba/scale_1200';

const markers: MarkerTypes[] = [
  {
    id: '1',
    coords: {
      lon: 20.50864229425784,
      lat: 54.70330996385549
    },
    logo: userIcon,
    price: 1000,
    name: 'Щербаков1'
  },
  {
    id: '2',
    coords: {
      lon: 20.50665124511721,
      lat: 54.67202556194164
    },
    logo: userIcon,
    price: 1000,
    name: 'Щербаков2'
  },
  {
    id: '3',

    coords: {
      lon: 54.73750184768866,
      lat: 54.73750184768866
    },
    logo: userIcon,
    price: 1000,
    name: 'Щербаков3'
  },
  {
    id: '4',
    coords: {
      lon: 20.507109008789058,
      lat: 54.70384916409364
    },
    logo: userIcon,
    price: 1000,
    name: 'Щербаков4'
  }
];

const styles = StyleSheet.create({
  root: {
    position: 'relative'
  },
  wrapperSearch: {
    position: 'absolute',
    top: 60,
    left: 0,
    width: '100%'
  },
  wrapperMap: {
    position: 'absolute',
    top: 130,
    left: 0,
    width: '100%'
  },
  controllerMap: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    zIndex: 5
  }
});

export function SearchScreen() {
  const [search, setSearch] = useState('');
  const refMap = React.createRef<YaMap>();
  const zoom = useRef(10);
  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        refMap.current?.setCenter({
          lon: position.coords.longitude,
          lat: position.coords.latitude
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  }, []);

  const onMe = () => {
    Geolocation.getCurrentPosition(
      position => {
        console.log(position);
        refMap.current?.setCenter({
          lon: position.coords.longitude,
          lat: position.coords.latitude,
          zoom: 12
        });
      },
      error => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };
  const onZoomPlus = () => {
    zoom.current = zoom.current + 1;
    refMap.current?.setZoom(zoom.current);
  };
  const onZoomMinus = () => {
    zoom.current = zoom.current - 1;
    refMap.current?.setZoom(zoom.current);
  };
  const bottomSheet = useBottomSheetContext();
  const selectEvent = () => {
    console.log(11);
    bottomSheet.show(EVENTS_BOTTOM_SHEET_TYPE);
  };
  return (
    <View style={styles.root}>
      <View style={styles.wrapperSearch}>
        <InputSearch
          setValue={setSearch}
          value={search || ''}
          placeholder={'Поиск'}
        />
      </View>

      <View style={styles.wrapperMap}>
        <YaMap
          style={{
            height: 600,
            flex: 1,
            width: '100%'
          }}
          mapType="vector"
          onMapPress={cor => {
            console.log('=>(SearchScreen.tsx:146) cor', cor.nativeEvent);
            // setCoords({
            //     lon: cor.nativeEvent.lon,
            //     lat: cor.nativeEvent.lat
            // });
          }}
          ref={refMap}
        >
          <Marker
            onPress={selectEvent}
            visible={true}
            point={{ lon: markers[0].coords.lon, lat: markers[0].coords.lat }}
          >
            <MarkerMapEvents dataMarker={markers[0]} />
          </Marker>
        </YaMap>
        <View style={styles.controllerMap}>
          <ControllerMap
            onMe={onMe}
            onZoomPlus={onZoomPlus}
            onZoomMinus={onZoomMinus}
          />
        </View>
      </View>
    </View>
  );
}

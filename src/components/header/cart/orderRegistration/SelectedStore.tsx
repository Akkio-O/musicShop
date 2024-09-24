import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { loadYandexMaps } from '../../../../common/Delivery/yaMaps';
import { Typography } from '@mui/material';

const mapContainerStyle = {
	width: '100%',
	height: '250px',
	borderRadius: '30px',
};

export default function SelectedMap() {
	const [map, setMap] = useState<any>(null);
	const selectedMap = useSelector((state: any) => state.orderReg.map);
	const apiKey = 'ВАШ_API_КЛЮЧ';

	useEffect(() => {
		if (selectedMap) {
			loadYandexMaps(apiKey)
				.then(() => {
					const ymaps = window.ymaps;

					const mapContainer = document.getElementById('yandex-map');
					if (mapContainer) {mapContainer.innerHTML = ''}
					map && map.destroy();

					const newMap = new ymaps.Map('yandex-map', {
						center: selectedMap.coords,
						zoom: 13,
					});

					const placemark = new ymaps.Placemark(selectedMap.coords, {
						balloonContent: selectedMap.name,
					});
					newMap.geoObjects.add(placemark);

					setMap(newMap);
				})
				.catch(err => {
					console.error('Ошибка загрузки карты:', err);
				});
		}

		return () => {
			if (map) {
				map.destroy();
			}
		};
	}, [selectedMap, apiKey]);

	return (
		<div>
			{selectedMap ? (
				<div id="yandex-map" style={mapContainerStyle}></div>
			) : (
				<Typography sx={{ textAlign: 'center' }}>Карта не выбрана</Typography>
			)}
		</div>
	);
}

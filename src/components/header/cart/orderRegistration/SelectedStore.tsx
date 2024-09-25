import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { loadYandexMaps } from '../../../../common/Delivery/yaMaps';
import { Typography } from '@mui/material';

const mapContainerStyle = {
	width: '100%',
	height: '250px',
	borderRadius: '30px',
};

export default function SelectedMap() {
	const mapRef = useRef<any>(null);
	const selectedMap = useSelector((state: any) => state.orderReg.map);
	const apiKey = 'ВАШ_API_КЛЮЧ';
	useEffect(() => {
		if (selectedMap) {
			loadYandexMaps(apiKey)
				.then(() => {
					const ymaps = window.ymaps;

					if (mapRef.current && mapRef.current.getCenter().equals(selectedMap.coords)) {
						return;
					}

					const mapContainer = document.getElementById('yandex-map');
					if (mapContainer) {
						mapContainer.innerHTML = '';
					}
					if (mapRef.current) {
						mapRef.current.destroy();
					}

					const newMap = new ymaps.Map('yandex-map', {
						center: selectedMap.coords,
						zoom: 13,
					});

					const placemark = new ymaps.Placemark(selectedMap.coords, {
						balloonContent: selectedMap.name,
					});
					newMap.geoObjects.add(placemark);

					mapRef.current = newMap;
				})
				.catch(err => {
					console.error('Ошибка загрузки карты:', err);
				});
		}
		return () => {
			if (mapRef.current) {
				mapRef.current.destroy();
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

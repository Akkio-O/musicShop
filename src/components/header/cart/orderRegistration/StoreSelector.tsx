import React, { useEffect, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
// contents
import { Modal, Box, Grid, Typography, Button, TextField, Checkbox, FormControlLabel } from '@mui/material';

// Redux
import { useDispatch } from 'react-redux';
import { addToMap } from './OrderRegAction';

// functions
import { loadYandexMaps } from '../../../../common/Delivery/yaMaps';

// styles
const mapContainerStyle = {
	width: '100%',
	height: '600px',
	borderRadius: '30px',
};

// Пример списка магазинов
const branches = [
	{ id: 1, name: 'ТЦ "Европа"', address: 'ул. 20-летия Октября, 123', availability: true, openNow: true, coords: [51.6558, 39.2003] },
	{ id: 2, name: 'Склад на Лизюкова', address: 'ул. Генерала Лизюкова, 50', availability: true, openNow: false, coords: [51.672, 39.1845] },
	{ id: 3, name: 'Магазин-склад', address: 'ул. Патриотов, дом 57', availability: false, openNow: true, coords: [51.6933, 39.1982] },
	{ id: 4, name: 'ТРК "Сити-парк Град"', address: 'Рамонский район, пос. Солнечный, улица Парковая, 3', availability: false, openNow: true, coords: [51.788103,39.204201] },
	{ id: 5, name: 'ТРЦ "Галерея Чижова"', address: 'ул. Кольцовская, 35', availability: false, openNow: true, coords: [51.667194,39.191861] },
	{ id: 6, name: 'ТК "Воронежский"', address: 'Московский проспект, 90/1', availability: false, openNow: true, coords: [51.717608,39.181782] },
];

export function StoreSelector({ style }: { style: React.CSSProperties }) {
	const [open, setOpen] = useState(false);
	const selectedMap = useSelector((state: any) => state.orderReg.map);
	const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
	const [map, setMap] = useState<any>(null);

	const [filters, setFilters] = useState({
		availableOnly: false,
		nearbyOnly: false,
		openNowOnly: false,
		searchQuery: '',
	});

	const dispatch = useDispatch();

	const handleMapSelect = useCallback((selectedMap: any) => {
		dispatch(addToMap(selectedMap));
	  }, [dispatch]);

	const handleOpen = useCallback(() => { setOpen(true); }, []);
	const handleClose = useCallback(() => {
		console.log(selectedBranch);
		if (selectedBranch) {
		  handleMapSelect(selectedMap);
		}
		setOpen(false);
		setMap(null);
	  }, [selectedBranch, selectedMap, handleMapSelect]);

	useEffect(() => {
		if (!open) return;
		if (map) return;

		const apiKey = 'ВАШ_API_КЛЮЧ';

		loadYandexMaps(apiKey)
			.then(() => {
				const ymaps = window.ymaps;
				const newMap = new ymaps.Map('yandex-map', {
					center: [51.665, 39.2026], // Координаты Воронежа
					zoom: 12,
				});

				branches.forEach(branch => {
					const placemark = new ymaps.Placemark(branch.coords, {
						balloonContent: branch.name,
					});
					placemark.events.add('click', () => {
						setSelectedBranch(branch.name);
					});
					newMap.geoObjects.add(placemark);
				});

				setMap(newMap);
			})
			.catch(err => {
				console.error(err);
			});
	}, [open, map]);

	const filteredBranches = branches.filter(branch => {
		const matchesAvailability = !filters.availableOnly || branch.availability;
		const matchesOpenNow = !filters.openNowOnly || branch.openNow;
		const matchesSearchQuery = branch.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) || branch.address.toLowerCase().includes(filters.searchQuery.toLowerCase());
		return matchesAvailability && matchesOpenNow && matchesSearchQuery;
	});

	return (
		<>
			<Button onClick={handleOpen} variant='contained' color='primary'>{selectedMap ? `Изменить магазин` : 'Выбрать магазин'}</Button>
			<Modal
				keepMounted
				open={open}
				onClose={handleClose}
				aria-labelledby="store-selector-modal-title"
				aria-describedby="store-selector-modal-description"
			>
				<Box className="scroll" sx={{ ...style, width: 1200, borderRadius: '30px 0 0 30px', p: 4 }}>
					<div className='modal__header'>
						<h2 id="child-modal-title">Карта</h2>
						<Button onClick={handleClose}>X</Button>
					</div>
					<Grid container spacing={3}>
						<Grid item xs={12}>
							<TextField
								fullWidth
								label="Название магазина, адрес"
								variant="outlined"
								value={filters.searchQuery}
								onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
								sx={{ mb: 2 }}
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={filters.availableOnly}
										onChange={() => setFilters({ ...filters, availableOnly: !filters.availableOnly })}
									/>
								}
								label="В наличии"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={filters.nearbyOnly}
										onChange={() => setFilters({ ...filters, nearbyOnly: !filters.nearbyOnly })}
									/>
								}
								label="Рядом"
							/>
							<FormControlLabel
								control={
									<Checkbox
										checked={filters.openNowOnly}
										onChange={() => setFilters({ ...filters, openNowOnly: !filters.openNowOnly })}
									/>
								}
								label="Открыт сейчас"
							/>
						</Grid>

						<Grid className="scroll" item xs={12} md={6} style={{ maxHeight: '600px', overflowY: 'scroll' }}>
							{filteredBranches.map(branch => (
								<Box key={branch.id} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '10px' }}>
									<Typography variant="h6">{branch.name}</Typography>
									<Typography>{branch.address}</Typography>
									<Typography>Ежедневно: {branch.openNow ? 'Открыт' : 'Закрыт'}</Typography>
									<Button
										variant={selectedBranch === branch.name ? "contained" : "outlined"}
										color="primary"
										onClick={() => {
											console.log(selectedMap?.id)
											if (selectedMap?.id === branch.id) {
												console.log('true')
												handleClose();
											} else {
												console.log('false')
												setSelectedBranch(branch.name);
												handleMapSelect(branch);
												handleClose();
											}
										}}
										sx={{ mt: 2 }}
									>
										{selectedBranch === branch.name ? 'Выбран' : 'Выбрать'}
									</Button>
								</Box>
							))}
						</Grid>

						<Grid item xs={12} md={6}>
							<div id="yandex-map" style={mapContainerStyle}></div>
						</Grid>
					</Grid>
				</Box>
			</Modal>
		</>
	);
}
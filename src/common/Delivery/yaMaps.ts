declare global {
	interface Window {
	  ymaps: any;
	}
  }
  
export function loadYandexMaps (apiKey: string) {
	return new Promise<void>((resolve, reject) => {
	  if (window.ymaps) {
		
		resolve();
		return;
	  }
  
	  const script = document.createElement('script');
	  script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
	  script.async = true;
	  script.onload = () => {
		window.ymaps.ready(() => {
		  resolve();
		});
	  };
	  script.onerror = () => {
		reject(new Error('Ошибка загрузки Yandex.Maps API'));
	  };
	  
	  document.body.appendChild(script);
	});
  }
  
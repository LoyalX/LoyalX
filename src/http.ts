
export class Http {

	public static async get(url: string) {
		var promise = new Promise((resolve, reject) => {

			var xmlHttp = new XMLHttpRequest();
			xmlHttp.onreadystatechange = () => {
				if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
					let ContentType = xmlHttp.getResponseHeader("Content-Type");
					switch (ContentType) {
						case 'json':
						case 'JSON':
							resolve(JSON.parse(xmlHttp.responseText));
							break;

						default:
							resolve(xmlHttp.responseText);
							break;
					}

				} else {
					reject();
				}
			}
			xmlHttp.open("GET", url, true); // true for asynchronous 
			xmlHttp.send(null);

		});
		return promise;
	}
}
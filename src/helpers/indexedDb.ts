// Setup

export const createDatabase = () => {
	const request = indexedDB.open('data', 2);

	request.onupgradeneeded = function (event) {
		const db = (event.target as IDBRequest).result as IDBDatabase;
		db.createObjectStore('store', { keyPath: 'id' });
		console.log('Database setup complete');
	};
};

// Helper Functions

interface Data {
	id: string;
	[key: string]: any;
}

export const addDataToDb = (data: Data) => {
	const dbRequest = indexedDB.open('data', 2);

	dbRequest.onsuccess = function (event) {
		getDataFromDb(data.id).then((result) => {
			if (!result) {
				addToDb();
			} else {
				deleteDataFromDb(data.id).then(() => addToDb());
			}
		});

		const addToDb = () => {
			const db = (event.target as IDBRequest).result as IDBDatabase;
			const transaction = db.transaction('store', 'readwrite');
			const store = transaction.objectStore('store');

			const addRequest = store.add(data);
			addRequest.onsuccess = () => console.log(`Added: ${data.id}`);
			addRequest.onerror = (err) => {
				console.error(`Error adding: ${data.id}`);
				console.error(err);
			};
		};
	};
};

export const getDataFromDb = (id: string): Promise<any> => {
	return new Promise((resolve, reject) => {
		const dbRequest = indexedDB.open('data', 2);

		dbRequest.onsuccess = function (event) {
			const db = (event.target as IDBRequest).result as IDBDatabase;
			const transaction = db.transaction('store', 'readonly');
			const store = transaction.objectStore('store');

			const getRequest = store.get(id);

			getRequest.onsuccess = function (event) {
				const result = (event.target as IDBRequest).result;
				resolve(result); // Resolve the Promise with the retrieved data
			};

			getRequest.onerror = function () {
				reject(new Error('Error retrieving data')); // Reject the Promise on error
			};
		};

		dbRequest.onerror = function () {
			reject(new Error('Error opening database')); // Reject if database open fails
		};
	});
};

export const deleteDataFromDb = (id: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		const dbRequest = indexedDB.open('data', 2);

		dbRequest.onsuccess = function (event) {
			const db = (event.target as IDBRequest).result as IDBDatabase;
			const transaction = db.transaction('store', 'readwrite');
			const store = transaction.objectStore('store');

			const deleteRequest = store.delete(id);

			deleteRequest.onsuccess = function () {
				console.log(`Record with id ${id} deleted successfully`);
				resolve();
			};

			deleteRequest.onerror = function () {
				console.error(`Failed to delete record with id ${id}`);
				reject(deleteRequest.error);
			};
		};

		dbRequest.onerror = function () {
			console.error('Error opening database');
			reject(dbRequest.error);
		};
	});
};

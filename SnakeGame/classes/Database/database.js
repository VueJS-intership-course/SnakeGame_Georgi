let db;
export class Database {
    static initialize() {
        const openRequest = indexedDB.open('myDatabase', 1);

        openRequest.onupgradeneeded = (e) => {
            db = e.target.result;
            console.log('running onupgradeneeded');
            const storeOS = db.createObjectStore('myDatabaseStore', { keyPath: "name" });
            console.log(storeOS);
        };

        openRequest.onsuccess = (e) => {
            console.log('running onsuccess');
            db = e.target.result;
        };

        openRequest.onerror = (e) => {
            console.log('onerror! doesn\'t work');
        };
    }

    addItem(name, points, date) {
        const item = {
            name: name,
            points: points,
            date: date,
        };
        const tx = db.transaction("myDatabaseStore", "readwrite");
        const store = tx.objectStore('myDatabaseStore');
        store.add(item);
    }


    static getSingleItem(key, newPoints) {
        const transaction = db.transaction('myDatabaseStore', 'readwrite');
        const objectStore = transaction.objectStore('myDatabaseStore');
        const request = objectStore.get(key);
    
        request.onsuccess = () => {
            const player = request.result;
            if (player) {
                player.points = newPoints;
                const updateRequest = objectStore.put(player); 
                updateRequest.onsuccess = () => {
                    console.log(`Player ${key} points updated to ${newPoints}`);
                };
                updateRequest.onerror = (err) => {
                    console.error(`Error updating player information: ${err}`);
                };
            } else {
                console.error(`Player with key ${key} not found.`);
            }
        };
    
        request.onerror = (err) => {
            console.error(`Error getting player information: ${err}`);
        };
    }


    static async getAll() {
        return new Promise((resolve, reject) => {
            const request = db.transaction('myDatabaseStore').objectStore('myDatabaseStore').getAll();
    
            request.onsuccess = () => {
                const players = request.result;
                resolve(players);
            };
    
            request.onerror = (err) => {
                console.error(`Error retrieving players' information: ${err}`);
                reject(err);
            };
        });
    }

}

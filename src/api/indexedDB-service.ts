import { IAvailableCurrenciesDataIndexedDB } from "./indexedDB-service.types";


// DataBase
export const iDB_NAME = 'CurrDashboardDB';
export const iDB_VERSION = 1;


export enum Stores {
    AvailableCurrencies = 'availableCurrencies',
    Currencies = 'currencies',
};

export enum KeyPaths {
    CurrCode = 'curr_code',
};


// indexedDBSupport
const indexedDBSupport = () => {
    return 'indexedDB' in window;
};


// createStructure
const createStructure = (request: any) => {
    if (!request)
        throw (new Error("ERROR_createStructure()_no_connect"));

    try { request.result.deleteObjectStore(Stores.AvailableCurrencies) } catch (e) { }
    try { request.result.deleteObjectStore(Stores.Currencies) } catch (e) { }

    request.result.createObjectStore(Stores.AvailableCurrencies, { keyPath: KeyPaths.CurrCode });

    request.result.createObjectStore(Stores.Currencies, { keyPath: KeyPaths.CurrCode });
};


// putPlanData
export const putInIndexedDB = (
    storeName: string,
    objectValues: IAvailableCurrenciesDataIndexedDB
): Promise<any> => {
    return new Promise(
        (resolve, reject) => {
            if (!indexedDBSupport())
                reject(new Error("ERROR_browser_not_supported"));

            // openDB
            const openDB = indexedDB.open(iDB_NAME, iDB_VERSION);
            openDB.onerror = () => reject(new Error("ERROR_putInIndexedDB()_connect_db"));
            openDB.onupgradeneeded = () => createStructure(openDB);

            openDB.onsuccess = async (event: any) => {
                const store = event.target.result
                    .transaction(storeName, "readwrite")
                    .objectStore(storeName);

                // putResult
                const putResult = store.put(objectValues);
                putResult.onerror = () => reject(new Error("ERROR_putInIndexedDB()_put"));
                putResult.onsuccess = (e: any) => resolve(e.target.result);
            };
        }
    );
};



// getPlanData
export const getFromIndexedDB = (
    storeName: string,
    keyValue: string,
): Promise<IAvailableCurrenciesDataIndexedDB | undefined> => {
    return new Promise(
        (resolve, reject) => {
            if (!indexedDBSupport())
                reject(new Error("ERROR_browser_not_supported"));

            // openDB
            const openDB = indexedDB.open(iDB_NAME, iDB_VERSION);
            openDB.onerror = () => reject(new Error("ERROR_getFromIndexedDB()_connect_db"));
            openDB.onupgradeneeded = () => createStructure(openDB);

            openDB.onsuccess = (event: any) => {
                const store = event.target.result
                    .transaction(storeName, "readwrite")
                    .objectStore(storeName);

                // getResult
                const getResult = store.get(keyValue);
                getResult.onerror = () => reject(new Error("ERROR_getFromIndexedDB()_get"));
                getResult.onsuccess = (e: any) => {
                    resolve(e.target.result);
                };
            };
        }
    );
};



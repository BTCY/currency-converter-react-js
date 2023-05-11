import { IStoreDataInIndexedDB, Stores } from "./indexedDB-service.types";

/**
 * @file API: Indexed DB.
 */


/** DB name */
export const iDB_NAME = "CurrDashboardDB";

/** DB version */
export const iDB_VERSION = 3;

/** Primary key */
export const KEY_PATH = "key";


/**
 * Checking: does the browser support working with Indexed DB .
 * 
 * @return  {boolean}
 */
const indexedDBSupport = (): boolean => {
    return "indexedDB" in window;
};


/**
 * Creating a structure Indexed DB.
 * 
 * @param   {IDBOpenDBRequest}   request  connection to Indexed DB  
 * @return  {void}
 */
const createStructure = (request: IDBOpenDBRequest): void => {
    if (!request)
        throw (new Error("ERROR_createStructure()_no_connect"));

    try { request.result.deleteObjectStore(Stores.AvailableCurrencies) } catch (e) { }
    try { request.result.deleteObjectStore(Stores.ConvertedCurrency) } catch (e) { }
    try { request.result.deleteObjectStore(Stores.CurrencyFluctuations) } catch (e) { }
    try { request.result.deleteObjectStore(Stores.LatestExchangeRates) } catch (e) { }
    try { request.result.deleteObjectStore(Stores.ExchangeRateHistory) } catch (e) { }

    request.result.createObjectStore(Stores.AvailableCurrencies, { keyPath: KEY_PATH });
    request.result.createObjectStore(Stores.ConvertedCurrency, { keyPath: KEY_PATH });
    request.result.createObjectStore(Stores.CurrencyFluctuations, { keyPath: KEY_PATH });
    request.result.createObjectStore(Stores.LatestExchangeRates, { keyPath: KEY_PATH });
    request.result.createObjectStore(Stores.ExchangeRateHistory, { keyPath: KEY_PATH });
};


/**
 * Put data into Indexed DB.
 * 
 * @param   {Stores}                  storeName      store name where to put data  
 * @param   {IStoreDataInIndexedDB}   objectValues   data
 * @return  {Promise<any>}
 */
export const putInIndexedDB = <T extends Stores>(
    storeName: Stores,
    objectValues: IStoreDataInIndexedDB<T>
): Promise<unknown> => {
    return new Promise(
        (resolve, reject) => {
            if (!indexedDBSupport())
                reject(new Error("ERROR_browser_not_supported"));

            // open DB
            const openDB = indexedDB.open(iDB_NAME, iDB_VERSION);
            openDB.onerror = () => reject(new Error("ERROR_putInIndexedDB()_connect_db"));
            openDB.onupgradeneeded = () => createStructure(openDB);

            openDB.onsuccess = async (event: any) => {
                const store = event.target.result
                    .transaction(storeName, "readwrite")
                    .objectStore(storeName);

                // put result
                const putResult = store.put(objectValues);
                putResult.onerror = () => reject(new Error("ERROR_putInIndexedDB()_put"));
                putResult.onsuccess = (e: any) => resolve(e.target.result);
            };
        }
    );
};


/**
 * Get data from Indexed DB.
 * 
 * @param   {Stores}     storeName   store name where to get data from  
 * @param   {KeyPaths}   keyPath     key by which to find and get data  
 * @return  {Promise<IStoreDataInIndexedDB | undefined>}
 */
export const getFromIndexedDB = <T extends Stores>(
    storeName: Stores,
    keyPath: string,
): Promise<IStoreDataInIndexedDB<T> | undefined> => {
    return new Promise(
        (resolve, reject) => {
            if (!indexedDBSupport())
                reject(new Error("ERROR_browser_not_supported"));

            // open DB
            const openDB = indexedDB.open(iDB_NAME, iDB_VERSION);
            openDB.onerror = () => reject(new Error("ERROR_getFromIndexedDB()_connect_db"));
            openDB.onupgradeneeded = () => createStructure(openDB);

            openDB.onsuccess = (event: any) => {
                const store = event.target.result
                    .transaction(storeName, "readwrite")
                    .objectStore(storeName);

                // get result
                const getResult = store.get(keyPath);
                getResult.onerror = () => reject(new Error("ERROR_getFromIndexedDB()_get"));
                getResult.onsuccess = (e: any) => {
                    resolve(e.target.result);
                };
            };
        }
    );
}; 


/**
 * Delete DB in IndexedDB.
 *  
 * @return  {Promise<unknown>}
 */
export const deleteIndexedDB = (): Promise<unknown> => {
    return new Promise(
        (resolve, reject) => {
            if (!indexedDBSupport())
                reject(new Error("ERROR_browser_not_supported"));

            // open DB
            const openDB = indexedDB.open(iDB_NAME, iDB_VERSION);
            openDB.onerror = () => reject(new Error("ERROR_deleteIndexedDB()_connect_db")); 

            openDB.onsuccess = (event: any) => {
                // delete DB
                const deleteResult = indexedDB.deleteDatabase(iDB_NAME);

                deleteResult.onerror = () => reject(new Error("ERROR_deleteIndexedDB()_delete"));
                deleteResult.onsuccess = (e: any) => {
                    resolve(e.target.result);
                };
            };
        }
    );
};


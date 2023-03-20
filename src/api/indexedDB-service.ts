import { IStoreDataInIndexedDB } from "./indexedDB-service.types";

/**
 * @file API: Indexed DB.
 */


/** DB name */
export const iDB_NAME = 'CurrDashboardDB';

/** DB version */
export const iDB_VERSION = 1;


/** 
 * Stores: available stores in Indexed DB.
 * 
 * @enum Stores   
 */
export const enum Stores {
    /** Store with available currencies */
    AvailableCurrencies = 'availableCurrencies',

    /** Store with converted currency */
    Currencies = 'currencies',
};


/** 
 * Keys: available keys in Indexed DB.
 * 
 * @enum KeyPaths   
 */
export const enum KeyPaths {
    /** Currency code */
    CurrCode = 'curr_code',
};


/**
 * Checking: does the browser support working with Indexed DB .
 * 
 * @return  {boolean}
 */
const indexedDBSupport = (): boolean => {
    return 'indexedDB' in window;
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
    try { request.result.deleteObjectStore(Stores.Currencies) } catch (e) { }

    request.result.createObjectStore(Stores.AvailableCurrencies, { keyPath: KeyPaths.CurrCode });
    request.result.createObjectStore(Stores.Currencies, { keyPath: KeyPaths.CurrCode });
};


/**
 * Put data into Indexed DB.
 * 
 * @param   {Stores}                  storeName      store name where to put data  
 * @param   {IStoreDataInIndexedDB}   objectValues   data
 * @return  {Promise<any>}
 */
export const putInIndexedDB = (
    storeName: Stores,
    objectValues: IStoreDataInIndexedDB
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
 * @param   {KeyPaths}   keyValue    key by which to find and get data  
 * @return  {Promise<IStoreDataInIndexedDB | undefined>}
 */
export const getFromIndexedDB = (
    storeName: Stores,
    keyValue: KeyPaths,
): Promise<IStoreDataInIndexedDB | undefined> => {
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
                const getResult = store.get(keyValue);
                getResult.onerror = () => reject(new Error("ERROR_getFromIndexedDB()_get"));
                getResult.onsuccess = (e: any) => {
                    resolve(e.target.result);
                };
            };
        }
    );
};



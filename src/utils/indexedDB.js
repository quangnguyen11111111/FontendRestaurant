const dbName = 'cartDB';
const storeName = 'cartItems';

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, 1);

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        // Sử dụng composite key với keyPath là một đối tượng, kết hợp FoodID và size
        db.createObjectStore(storeName, { keyPath: ['FoodID','SizeID'] });
      }
    };

    request.onsuccess = (e) => {
      resolve(e.target.result);
    };

    request.onerror = (e) => {
      reject(e);
    };
  });
};

const saveToIndexedDB = async (cartItems) => {
  const db = await openDB();
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);

  // Lưu từng mục với key là [FoodID, size] (sử dụng mảng cho composite key)
  cartItems.forEach(item => {
    store.put(item); // Lưu item vào store với composite key tự động là [FoodID, size]
    console.log("Đã lưu:", item,store.put(item));
  });

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject();
  });
};

const loadFromIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction([storeName], 'readonly');
  const store = transaction.objectStore(storeName);
  const items = store.getAll();

  return new Promise((resolve, reject) => {
    items.onsuccess = (e) => resolve(e.target.result);
    items.onerror = () => reject();
  });
};

const clearIndexedDB = async () => {
  const db = await openDB();
  const transaction = db.transaction([storeName], 'readwrite');
  const store = transaction.objectStore(storeName);
  store.clear();

  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject();
  });
};

  
  

export { saveToIndexedDB, loadFromIndexedDB, clearIndexedDB };
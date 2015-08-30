import Promise from 'bluebird';

class Database {
  constructor(_window){
    //1.indexedDB関連オブジェクトの取得
    this.indexedDB = _window.indexedDB;
    this.IDBTransaction = _window.IDBTransaction;
    this.IDBKeyRange = _window.IDBKeyRange;
    this.IDBCursor = _window.IDBCursor;
    this.IDB_Name = 'remotty-client';
  }

  _connect(done){
    //2.indexedDBを開く
    let connection = indexedDB.open(this.IDB_Name, 1);

    // Databaseの定義
    connection.addEventListener('upgradeneeded', (event) => {
      let db = event.target.result;

      let userCollection = db.createObjectStore("user", {
        keyPath: "user_id"
      });

      this.userCollection = userCollection;
      this.connection = connection;

    });

    connection.addEventListener('success', (event) => {
      // オブジェクトストアを読み書き権限付きで使用することを宣言
      let db = connection.result;
      let transaction = db.transaction(["user"], "readwrite");
      done(null, transaction);
    });

    connection.addEventListener('error', (event) => {
      done(event);
    });
  }

  delete(databaseName){
    var deleteRequest = this.indexedDB.deleteDatabase(databaseName);

    deleteRequest.addEventListener('success', () => {
      console.log(databaseName + ' deleted.');
    });
  }

  save(collectionName, additinalDocument){
    this[collectionName].add(additinalDocument);
  }

  update(){

  }

  find(opts = {}, done){
    let collectionName = opts.collectionName; // 'user'
    let query = opts.query; // 'name'
    let values = opts.values; // ['atom', 'electron', 'github']

    let store = this.transaction.objectStore(collectionName);
    let index = store.index(query);

    store
    .openCursor(this.IDBKeyRange.only(values))
    .on('success', (event) => {
      var cursor = event.target.result;
      if (cursor) {
        cursor.continue();
        done(null, cursor);
      }
    });
  }

  findOne(opts = {}, done){
    let collectionName = opts.collectionName;
    let query = opts.query;
    let values = opts.values;

    let store = this.transaction.objectStore(collectionName);
    let index = store.index(query);

    index
    .get(this.IDBKeyRange.only(values))
    .on('success', (event) => {
      var cursor = event.target.result;
      if (cursor) {
        cursor.continue();
        done(null, cursor);
      }
    });
  }
}

export default Database;

export function connection(_window) {
  let db = new Database(_window);
  return new Promise((resolve, reject)=>{
    db._connect((error, transaction) => {
      if(error){
        return reject(error);
      }
      resolve(transaction);
    });
  });
};

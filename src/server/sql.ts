import sqlite3 from 'sqlite3';

export default class Sql {
    db: sqlite3.Database | null = null;
    isOpen = false;

   open(write?: boolean, create?: boolean) {
       return new Promise((resolve, reject) => {
           let mode = sqlite3.OPEN_READONLY;
           if (write) {
               mode = sqlite3.OPEN_READWRITE;
           }
           if (create) {
               mode |= sqlite3.OPEN_CREATE;
           }
           console.log(`DB_PATH: ${process.env.DB_PATH}`);
           this.db = new sqlite3.Database(process.env.DB_PATH, mode, (err) => {
               if (err) {
                   reject(err);
                   return;
               }
               this.isOpen = true;
               resolve();
           })
       });
   }
   
   run(sql: string, params?: {[key: string]: string | number}) {
       return new Promise((resolve, reject) => {
           if (this.db === null) {
               reject(new Error(`DB is null`));
               return;
           }
           this.db.run(sql, params || {}, err => {
               err ? reject(err) : resolve();
           });
       })
   }

   all(sql: string, params?: {[key: string]: string | number}) {
       return new Promise<any[]>((resolve, reject) => {
           if (this.db === null) {
               reject(new Error('DB is null'));
               return;
           }
           this.db.all(sql, params, (err, rows) => (
              err ? reject(err) : resolve(rows)
           ));
       });
   }

   get(sql: string, params?: {[key: string]: string | number}) {
       return new Promise<any[]>((resolve, reject) => {
           if(this.db === null) {
               reject(new Error('db is null'));
               return;
           }
            this.db.get(sql, params || {}, (err, row) => {
                err ? reject(err) : resolve(row);
            })
       })
   }

   close() {
       return new Promise((resolve, reject) => {
           if (this.db === null || !this.isOpen) {
                resolve();
                return;
            }
            this.db.close((err) => {
                this.isOpen = false;
                return err ? reject(err) : resolve();
            });
       });
   }
}
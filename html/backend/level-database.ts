export class Database {
    ​
    private level = require('level');
    private dbFile: string;
    private db: any;
​
    /*
    This function should initialize the leveldb database using the provided filename
    Remember that the level module, dbfile and db variables are all PRIVATE so you must access them using this
    */
    constructor(fileName: string) {
        // Your code here
        this.dbFile = fileName;
        this.db = this.level(this.dbFile);
    }
    
    /*
    A function to put a key, value pair into the database
    For debugging purposes you may want to add a console.log() statement here
    Inputs:
        key - a string that is the key
        value - a value
    */
    public async put(key: string, value: any) : Promise<void> {
        // Your code here
        if(this.isFound(key)){
            await this.db.put(key, value);
        }
    }
    
    /*
    A function to get a value given a key from the database
    For debugging purposes you may want to add a console.log() statement here
    Inputs:
        key - a string that is the key
    Returns:
        value - the value of the key in the db
        null if there was an error
    */
    public async get(key: string) : Promise<string> {
        // Your code here
        if(this.isFound(key)){
            return await this.db.get(key);
        }
        return null;
    }
    
    /*
    A function to delete a key-value pair from the database
    Inputs:
        key - a string that is the key
    */
    public async del(key: string) : Promise<void> {
        // Your code here
        if(this.isFound(key)){
            await this.db.del(key);
        }
    }
    
    /*
    A function to check if a key-value pair exists in the database
    Inputs:
        key - a string that is the key
    Returns:
        true if the value is in the db
        false otherwise
    */
    public async isFound(key: string) : Promise<boolean> {
        // Your code here
        try {
            let v : string = await this.db.get(key);
            return true;
        } catch (err) {
            return false;
        }
    }
}
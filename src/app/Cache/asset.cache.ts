export default class AssetCache{
    private static assets = {};
    constructor(){};
    
    static add(userId: string, value: string[]){
        if(!this.assets[userId]){
            this.assets[userId]= value;
        }
    };

    static get(userId: string){
        return this.assets[userId] || null;
    }

    // static update(){
    //     this.assets = {};
    // };

    static delete(){
        this.assets = {};
    };

}
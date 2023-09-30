import { MongoClient } from "mongodb";
let dbConnection;
const uri = "mongodb+srv://Talha:Talha123@users.qvq5gfg.mongodb.net/usersData?retryWrites=true&w=majority";
const connectObj = {
    connectionToDb: (cb) => {
        MongoClient.connect(uri)
            .then(client => {
                dbConnection = client.db()
                return cb()
            })
            .catch(err => {
                console.log(err)
                return cb(err)
            })
    },

    getDb: () => dbConnection

}
export default connectObj
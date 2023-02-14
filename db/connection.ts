import {connect} from "mongoose";
const db:string = process.env.DB || "mongodb://127.0.0.1/sociomedia";
connect(db)
.then(():void=>console.log(`connected to db`))
.catch(err=>console.log(err))
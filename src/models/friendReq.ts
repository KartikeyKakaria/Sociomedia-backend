import { Schema, model } from 'mongoose';
interface request{
    from:string,
    to:string,
}

const requestSchema = new Schema<request>({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
        required:true,
    }
})

const pendingReqs = model<request>("pendingRequests", requestSchema);
export default pendingReqs;
export {request}
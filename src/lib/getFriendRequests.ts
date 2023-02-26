import pendingReqs, {request} from "../models/friendReq";

export default async function pendingRequests(id:string):Promise<string[] | boolean>{
    try{
        const result = await pendingReqs.find({
            from:id,
        })
        console.log(id);
        const pendingRequestList = result.map(curr=>{
            return curr.to;
        })
        return pendingRequestList;
    }catch(error){
        console.log(error)
        return false;
    }
}
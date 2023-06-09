import { Request, Response, RequestHandler } from 'express';
import getFriendRequests from "../../lib/getFriendRequests";
import USER from "../../models/User";
import pendingReqs from "../../models/friendReq";
import { msgResponse } from '../../lib/Classes';

const acceptRequest:RequestHandler = async (req:Request, res:Response)=>{
    const rep = new msgResponse(false, "accepted successfully")
    const { _id } = JSON.parse(req.params.user)
    const { requestId } = req.body;
    const requests = await getFriendRequests(requestId);
    if(!requests){
        rep.changeMessage("Server error")
        return res.status(500).json(rep)
    }
    if(!(requests as string[]).includes(_id)){
        rep.changeMessage("No pending friend request from the user");
        return res.status(402).json(rep)
    }
    
    try{
        await pendingReqs.deleteOne({from:requestId, to:_id});
        await USER.updateOne({_id:_id}, {
            $push:{
                friends:requestId
            }
        })
        await USER.updateOne({_id:requestId},{
            $push:{
                friends:_id
            }
        })
        rep.changeStats(true);
        return res.status(201).json(rep);
    }catch(error){
        rep.changeMessage(`${error}`);
        return res.status(500).json(rep)
    }
}

export default acceptRequest;

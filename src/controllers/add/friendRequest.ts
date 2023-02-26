import { Request,Response, RequestHandler } from "express";
import pendingReqs from "../../models/friendReq";
import { msgResponse } from "../../lib/Classes";
import pendingRequests from "../../lib/getFriendRequests";
const friendReq:RequestHandler = async(req:Request, res:Response)=>{
    const rep = new msgResponse(false, "request sent successfully")
    const { friendId } = req.body;
    const { _id, friends } = JSON.parse(req.params.user);
    if(!friendId){
        rep.changeMessage('please enter out all fields');
        return res.status(402).json(rep);
    }
    const sentFriendRequests = await pendingRequests(_id);
    if(!sentFriendRequests){
        rep.changeMessage("Internal server error");
        return res.status(500).json(rep)
    }
    if((sentFriendRequests as string[]).includes(friendId) || friends.includes(friendId)){
        rep.changeMessage("You already sent them a friend request");
        return res.status(402).json(rep)
    }
    try{
        const pendingReq = new pendingReqs({
            from:_id,
            to:friendId,
        })
        const result = await pendingReq.save();
        if(result){
            rep.changeStats(true);
            return res.status(201).json(rep);
        }
    }catch(error){
        console.log(error);
        rep.changeMessage(`${error} Error`);
        return res.status(500).json(rep)
    }
}

export default friendReq;
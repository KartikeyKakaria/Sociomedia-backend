import { RequestHandler, Request, Response } from "express";
import { dbUser } from "../../lib/types";
import { compare, hash } from "bcryptjs";
import { msgResponse } from "../../lib/Classes";
import USER from "../../models/User";
interface reqBody {
    prevPassword: string;
    newPassword: string;
}
const editPassword: RequestHandler = async (req: Request, res: Response) => {
    const { _id, password } = JSON.parse(req.params.user) as dbUser;
    const { prevPassword, newPassword } = req.body as reqBody;
    const rep = new msgResponse(false, "password updated successfully")
    try {
        const isPasswordValid = await compare(prevPassword, password);
        if (isPasswordValid) {
            const dbPassword = await hash(newPassword, 4)
            await USER.updateOne({ _id }, {
                $set: {
                    password: dbPassword
                }
            })
            rep.changeStats(true);
            return res.status(201).json(rep)
        }
        rep.changeMessage("Invalid password")
        return res.status(402).json(rep)
    } catch (err) {
        rep.changeMessage(`${err}`)
        return res.status(500).json(rep)
    }
}
export default editPassword;
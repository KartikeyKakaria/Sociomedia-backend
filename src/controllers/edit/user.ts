import { Request, Response, RequestHandler } from "express";
import USER from "../../models/User";
import { msgResponse } from "../../lib/Classes";
const editUser: RequestHandler = async (req: Request, res: Response) => {
    const { _id, name, email, age, DOB, gender, number } = JSON.parse(req.params.user);
    const { newName, newAge, newEmail, newDOB, newGender, newNumber } = req.body;
    console.log(newName)
    const resp = new msgResponse(false, "Data updated successfully")
    if (!newName && !newAge && !newEmail && !newDOB && !newGender && !newNumber) {
        resp.changeMessage("No change")
        return res.status(402).json(resp)
    }
    try {
        await USER.updateOne({ _id }, {
            $set: {
                name: newName || name,
                age: newAge || age,
                email: newEmail || email,
                DOB: newDOB || DOB,
                gender: newGender || gender,
                number: newNumber || number,
            }
        })
        resp.changeStats(true);
        return res.status(201).json(resp)


    } catch (error) {
        resp.changeMessage(`${error}`);
        return res.status(500).json(resp)
    }
}

export default editUser;
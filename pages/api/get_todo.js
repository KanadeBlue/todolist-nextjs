import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]';
import { get_user_without_set } from "../../lib/database";
import Cookies from 'cookies'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (req.method == 'GET') {
    const todos = await get_user_without_set("KanadeBlue")
    if (typeof todos == "string"){
        res.status(200).json({ success: false, msg: todos, data: null });
    } else {
        res.status(200).json({ success: true, msg: null, data: todos });
    }
  } else {
    res.status(200).json({ success: false, msg: "Send a Get request", data: null });
  }
}
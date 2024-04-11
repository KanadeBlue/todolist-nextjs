import { getServerSession } from "next-auth/next"
import { authOptions } from './auth/[...nextauth]';
import { get_user } from "../../lib/database";
import Cookies from 'cookies'

export default async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions)
  if (req.method == 'GET') {
    if (!session) {
      res.status(200).json({ success: false, msg: "You have to be logged in!", data: null });
      return;
    }
    const userid = session.user.id
    var username;
    const cookies = new Cookies(req, res)
    if (cookies.get("Username")){
      username = cookies.get("Username");
    } else {
      const resp = await fetch(
        `https://api.github.com/user/${userid}`
      );
      const data = await resp.json();
      username = data['login']
    }
    const todos = await get_user("KanadeBlue", "https://avatars.githubusercontent.com/u/124839201?v=4")
    if (typeof todos == "string"){
        res.status(200).json({ success: false, msg: todos, data: null });
    } else {
        res.status(200).json({ success: true, msg: null, data: todos });
    }
  } else {
    res.status(200).json({ success: false, msg: "Send a Get request", data: null });
  }
}
import { unstable_getServerSession } from 'next-auth';
import { NextApiRequest, NextApiResponse } from 'next';
import { authOptions } from '../auth/[...nextauth]';
import '@extType/ExtendedServerSession';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(400).json({ message: 'unknown request method' });
  // @ts-ignore
  const session: Session | null = await unstable_getServerSession(req, res, authOptions);
  console.log(session);
  if (!session) {
    return res.status(401).json({ message: 'You must be logged in.' });
  }
  return res.status(200).json(session);
}

/**
{"id":"4yXiXuKv8Bjiq3OvgTI8",
"user":{
  "provider":"google",
  "image":"https://lh3.googleusercontent.com/a-/AFdZucrZjGtLRwNmtWmonGNM4WWEzkgdIyaWGfrNVPorww=s96-c",
  "emailVerified":null,
  "characters":[],
  "name":"Kozue",
  "email":"esimileiar81@gmail.com",
  "role":"admin",
  "id":"4yXiXuKv8Bjiq3OvgTI8"
},
"expires":"2022-10-29T01:20:50.662Z",
"role":"admin"}
*/

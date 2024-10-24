import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";

interface AuthenticateParams {
	password: string;
	username: string;
}

export async function authenticate({password, username}: AuthenticateParams){
    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if(!user) throw new Error('User not found');

    const doesPasswordMatches = await compare(password, user.passwordHash)

    if(!doesPasswordMatches) throw new Error('Wrong credentials');

    return {user}
}
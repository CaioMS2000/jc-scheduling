import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";

interface RegisterParams {
	password: string;
	username: string;
}

export async function register({password, username}: RegisterParams){
    const userWithSameUsername = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if(userWithSameUsername) throw new Error('User already exists');

    const passwordHash = await hash(password, 6);
    const newUser = await prisma.user.create({
        data: {
            username,
            passwordHash,
        },
    });

    return {newUser}
}
import { ID, Query } from "node-appwrite"
import { users } from "../appwrite.config"
import { parseStringify } from "../utils"

export const createUser = async (user: CreateUserParams) => {
    try {
        if (!user.email || !user.phone || !user.name) {
            throw new Error("Invalid user data");
        }

        const newUser = await users.create(ID.unique(), user.email, user.phone, undefined, user.name);
        console.log({ newUser });

        return parseStringify(newUser);
    } catch (error: any) {
        console.error('Error creating user:', error);
        if (error && error?.code === 409) {
            try {
                const existingUser = await users.list([
                    Query.equal("email", [user.email])
                ]);
                return existingUser.users[0];
            } catch (listError: any) {
                console.error('Error listing existing user:', listError);
                throw listError;
            }
        } else {
            throw error;
        }
    }
};
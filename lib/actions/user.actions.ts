'use server';

import { ID, Query } from 'node-appwrite';
import {
  account,
  DATABASE_ID,
  databases,
  users,
  USERS_COLLECTION_ID,
} from '../appwrite.config';
import { parseStringify } from '../utils';

export const registerUser = async (userData: INewUser) => {
  const name = `${userData?.firstName} ${userData?.lastName}`;

  try {
    const newUser = await users.create(
      ID.unique(),
      userData.email,
      undefined,
      userData.password,
      name
    );

    const user = await databases.createDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      ID.unique(),
      {
        accountId: newUser.$id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: newUser.email,
      }
    );

    return parseStringify(user);
  } catch (error: any) {
    throw new Error(error?.response?.message);
  }
};

export const loginUser = async (user: { email: string; password: string }) => {
  try {
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    console.log(session);
    return session;
  } catch (error: any) {
    throw new Error(error?.response?.message);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      [Query.equal('accountId', currentAccount.$id)]
    );
    if (!currentUser) throw Error;
    console.log('first111', currentUser.documents[0]);
    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
};

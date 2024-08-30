'use server';

import { ID, Query } from 'appwrite';
import { account, appwriteConfig, databases } from './appwrite';
import { INewUser } from './types';

export async function createUser(user: INewUser) {
  const name = `${user.first_name} ${user.last_name}`;

  const newAccount = await account.create(
    ID.unique(),
    user.email,
    user.password,
    name
  );

  if (!newAccount) throw new Error('Unable to create account');

  const newUser = await saveUserToDb({
    accountId: newAccount.$id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: newAccount.email,
  });

  return newUser;
}

export async function saveUserToDb(user: {
  accountId: string;
  first_name: string;
  last_name: string;
  email: string;
}) {
  const newUser = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    ID.unique(),
    user
  );
  return newUser;
}

export async function loginUser(user: { email: string; password: string }) {
  try {
    console.log('hi', user);
    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );
    return session;
  } catch (error) {
    console.log('lolo', error);
  }
}

export async function getCurrentUser() {
  const currentAccount = await account.get();
  if (!currentAccount) throw new Error('No Account Found!');

  const currentUser = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal('accountId', currentAccount.$id)]
  );

  if (!currentUser) throw new Error('No User Found');
  return currentUser.documents[0];
}

export async function logoutUser() {
  const session = await account.deleteSession('current');
  return session;
}

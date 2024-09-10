import { ID, Query } from 'appwrite';
import { INewUser } from '../types';
import { account, appwriteConfig, databases } from './config';

export async function registerUser(user: INewUser) {
  const name = `${user.firstName} ${user.lastName}`;
  const newAccount = await account.create(
    ID.unique(),
    user.email,
    user.password,
    name
  );
  if (!newAccount) throw Error;

  const newUser = await saveUserToDB({
    accountId: newAccount.$id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: newAccount.email,
  });

  return newUser;
}

export async function saveUserToDB(user: {
  accountId: string;
  firstName: string;
  lastName: string;
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
  const session = await account.createEmailPasswordSession(
    user.email,
    user.password
  );
  return session;
}

export async function getCurrentUser() {
  const currentAccount = await account.get();
  if (!currentAccount) throw Error;
  const currentUser = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.usersCollectionId,
    [Query.equal('accountId', currentAccount.$id)]
  );
  if (!currentUser) throw Error;
  return currentUser.documents[0];
}

export async function logoutUser() {
  const session = await account.deleteSession('current');
  return session;
}

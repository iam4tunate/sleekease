import { Account, Client, Databases, Storage } from 'appwrite';

if (
  !process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID ||
  !process.env.NEXT_PUBLIC_APPWRITE_URL ||
  !process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID ||
  !process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID ||
  !process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID ||
  !process.env.NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID ||
  !process.env.NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID ||
  !process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID
) {
  throw new Error('Missing Appwrite environment variables');
}

export const appwriteConfig = {
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID,
  url: process.env.NEXT_PUBLIC_APPWRITE_URL,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID,
  storageId: process.env.NEXT_PUBLIC_APPWRITE_STORAGE_ID,
  usersCollectionId: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID,
  cartsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_CARTS_COLLECTION_ID,
  savesCollectionId: process.env.NEXT_PUBLIC_APPWRITE_SAVES_COLLECTION_ID,
  productsCollectionId: process.env.NEXT_PUBLIC_APPWRITE_PRODUCTS_COLLECTION_ID,
};

export const client = new Client();
client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

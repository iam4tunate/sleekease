import * as sdk from 'node-appwrite';

export const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PRODUCTS_COLLECTION_ID,
  SAVES_COLLECTION_ID,
  CARTS_COLLECTION_ID,
  USERS_COLLECTION_ID,
  NEXT_PUBLIC_STORAGE_ID: STORAGE_ID,
  NEXT_PUBLIC_ENDPOINT: ENDPOINT,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
export const account = new sdk.Account(client);

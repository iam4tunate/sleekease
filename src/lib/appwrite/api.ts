import { ID, Query } from 'appwrite';
import { INewProduct, INewUser, IUpdateProduct } from '../types';
import { account, appwriteConfig, databases, storage } from './config';

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

export async function createProduct(product: INewProduct) {
  const uploadedFiles: UploadedFile[] = [];

  try {
    for (const file of product.files) {
      const uploadedFile = await uploadFile(file);
      if (uploadedFile) {
        uploadedFiles.push(uploadedFile);
      } else {
        throw new Error('File upload failed.');
      }
    }

    const fileUrls = uploadedFiles.map((uploadedFile) => {
      const previewUrl = getFilePreview(uploadedFile.$id);
      return previewUrl;
    });

    const fileIds = uploadedFiles.map((uploadedFile) => uploadedFile.$id);

    const newProduct = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      ID.unique(),
      {
        title: product.title,
        price: Number(product.price),
        discount: Number(product.discount),
        category: product.category,
        description: product.description,
        sizes: product.sizes,
        features: product.features,
        imageUrls: fileUrls,
        imageIds: fileIds,
      }
    );

    return newProduct;
  } catch (error) {
    for (const uploadedFile of uploadedFiles) {
      await deleteFile(uploadedFile.$id);
    }
    throw error;
  }
}
interface UploadedFile {
  $id: string;
}

export async function uploadFile(file: File) {
  const uploadedFile = await storage.createFile(
    appwriteConfig.storageId,
    ID.unique(),
    file
  );
  return uploadedFile;
}

export function getFilePreview(fileId: string) {
  const fileUrl = storage.getFilePreview(
    appwriteConfig.storageId,
    fileId,
    2000,
    2000,
    // 'top',
    undefined,
    100
  );

  return fileUrl;
}

export async function deleteFile(fileId: string) {
  await storage.deleteFile(appwriteConfig.storageId, fileId);
  return { status: 'ok' };
}

export async function getRecentProducts() {
  const products = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.productsCollectionId,
    [Query.orderDesc('$createdAt')]
    // [Query.orderDesc('$createdAt'), Query.limit(20)]
  );
  return products;
}

export async function getProductbyId(productId: string) {
  const product = await databases.getDocument(
    appwriteConfig.databaseId,
    appwriteConfig.productsCollectionId,
    productId
  );
  return product;
}

export async function updateProduct(product: IUpdateProduct) {
  const hasFilesToUpdate = product.files.length > 0;
  const uploadedFiles: UploadedFile[] = [];

  try {
    let images = {
      imageUrls: product.imageUrls as string[],
      imageIds: product.imageIds as string[],
    };

    // Step 1: Delete old files if there are new files to update
    if (hasFilesToUpdate) {
      if (images.imageIds.length > 0) {
        // Delete existing files from Appwrite storage
        for (const fileId of images.imageIds) {
          await deleteFile(fileId);
        }
      }

      // Step 2: Upload new files
      for (const file of product.files) {
        const uploadedFile = await uploadFile(file);
        if (uploadedFile) {
          uploadedFiles.push(uploadedFile);
        } else {
          throw new Error('File upload failed.');
        }
      }

      const fileUrls = uploadedFiles.map((uploadedFile) => {
        const previewUrl = getFilePreview(uploadedFile.$id);
        return previewUrl.toString();
      });
      const fileIds = uploadedFiles.map((uploadedFile) => {
        return uploadedFile.$id;
      });

      images = {
        ...images,
        imageUrls: [...fileUrls],
        imageIds: [...fileIds],
      };
    }

    const updatedProduct = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.productsCollectionId,
      product.productId,
      {
        title: product.title,
        price: product.price,
        discount: product.discount,
        category: product.category,
        sizes: product.sizes,
        description: product.description,
        features: product.features,
        imageIds: images.imageIds,
        imageUrls: images.imageUrls,
      }
    );
    return updatedProduct;
  } catch (error) {
    for (const uploadedFile of uploadedFiles) {
      await deleteFile(uploadedFile.$id);
    }
    throw error;
  }
}

export async function deleteProduct(productId: string, imageIds: string[]) {
  if (!productId || !imageIds) throw Error;
  const deleteProduct = await databases.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.productsCollectionId,
    productId
  );
  for (const fileId of imageIds) {
    await deleteFile(fileId);
  }
  if (deleteProduct) {
    return { status: 'ok' };
  }
}

export async function getProductsByCategory(category: string) {
  const products = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.productsCollectionId,
    [Query.equal('category', category)]
  );
  return products;
}

export async function addToCart(
  productId: string,
  userId: string,
  size: string,
  quantity: number
) {
  const newCart = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.cartCollectionId,
    ID.unique(),
    { user: userId, product: productId, size, quantity }
  );
  return newCart;
}

export async function deleteFromCart(documentId: string) {
  if (!documentId) throw Error;
  const deleteCartItem = await databases.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.cartCollectionId,
    documentId
  );

  if (deleteCartItem) {
    return { status: 'ok' };
  }
}

export async function saveProduct(productId: string, userId: string) {
  const newCartItem = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.savesCollectionId,
    ID.unique(),
    { user: userId, product: productId }
  );
  return newCartItem;
}

export async function deleteSaved(documentId: string) {
  if (!documentId) throw Error;
  const deleteSavedItem = await databases.deleteDocument(
    appwriteConfig.databaseId,
    appwriteConfig.savesCollectionId,
    documentId
  );

  if (deleteSavedItem) {
    return { status: 'ok' };
  }
}

export async function updateQuantity(documentId: string, quantity: number) {
  const newCart = await databases.updateDocument(
    appwriteConfig.databaseId,
    appwriteConfig.cartCollectionId,
    documentId,
    { quantity }
  );
  return newCart;
}

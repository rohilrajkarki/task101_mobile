import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
} from "react-native-appwrite";
import * as Linking from "expo-linking";
import { openAuthSessionAsync } from "expo-web-browser";

//setup out appwrite client

export const config = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();

client.setEndpoint(config.endpoint!).setProject(config.projectId!);

export const avatar = new Avatars(client); //for image avatar
export const account = new Account(client);
export const databases = new Databases(client);

export async function login() {
  //Using expo linking to handling deep links and redirect URLs
  try {
    const redirectUri = Linking.createURL("/"); // ./ means pointing to the HOme page
    //Now once we have the redirect URI that we want to redirect back to we have to request and oAuth token from appwrite using the Google provider
    const response = await account.createOAuth2Token(
      OAuthProvider.Google,
      redirectUri
    );
    if (!response) throw new Error("Failed to login error 1");

    //Now for a login redirect pop up
    const browserResult = await openAuthSessionAsync(
      response.toString(),
      redirectUri
    );
    if (browserResult.type !== "success")
      throw new Error("Failed to login error 2");

    //if success then we can parse the newly returned URL to extract the query parametes by saying:
    const url = new URL(browserResult.url);

    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    if (!secret || !userId) throw new Error("Failed to login error 3");
    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("Failed to create a session");

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logout() {
  try {
    const response = await account.get();
    await account.deleteSession("current");
    console.log("logging out", response.email);
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

//function to fetch the info of currently logged in user
export async function getCurrentUser() {
  try {
    const response = await account.get();
    if (response.$id) {
      //then generate a avatar
      const userAvatar = avatar.getInitials(response.name);
      return {
        ...response,
        avatar: userAvatar.toString(),
      };
    }
  } catch (error) {
    console.error(error);
    return false;
  }
}
// export async function getLatestProperties() {
//   try {
//     const result = await databases.listDocuments(
//       config.databaseId!,
//       config.propertiesCollectionId!,
//       [Query.orderAsc("$createdAt"), Query.limit(5)]
//     );

//     return result.documents;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

// export async function getProperties({
//   filter,
//   query,
//   limit,
// }: {
//   filter: string;
//   query: string;
//   limit?: number;
// }) {
//   try {
//     const buildQuery = [Query.orderDesc("$createdAt")];

//     if (filter && filter !== "All") {
//       buildQuery.push(Query.equal("type", filter));
//     }
//     if (query) {
//       buildQuery.push(
//         Query.or([
//           Query.search("name", query),
//           Query.search("address", query),
//           Query.search("type", query),
//         ])
//       );
//     }
//     if (limit) buildQuery.push(Query.limit(limit));

//     const result = await databases.listDocuments(
//       config.databaseId!,
//       config.propertiesCollectionId!,
//       buildQuery
//     );
//     return result.documents;
//   } catch (error) {
//     console.error(error);
//     return [];
//   }
// }

// export async function getPropertyById({ id }: { id: string }) {
//   try {
//     const result = await databases.getDocument(
//       config.databaseId!,
//       config.propertiesCollectionId!,
//       id
//     );
//     return result;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

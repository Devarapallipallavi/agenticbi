const API_BASE_URL = "http://4.227.238.34:8000";
export const API_BASE = API_BASE_URL;

const safeJsonParse = async (response: Response) => {
  const text = await response.text();
  if (!text.trim()) return {};
  try {
    return JSON.parse(text);
  } catch {
    return {};
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("access_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// ---------------- AUTH ----------------
export interface SignupData { name: string; email: string; password: string; }
export interface LoginData { email: string; password: string; }
export interface AuthResponse { message?: string; access_token?: string; token_type?: string; user?: any; }

export const signup = async (data: SignupData): Promise<AuthResponse> => {
  const res = await fetch(`${API_BASE}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(data),
  });
  const result = await safeJsonParse(res);
  if (!res.ok) throw new Error(result.detail || result.message || "Signup failed");
  return result;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify(data),
  });
  const result = await safeJsonParse(res);
  if (!res.ok) throw new Error(result.detail || result.message || "Login failed");
  if (result.access_token) localStorage.setItem("access_token", result.access_token);
  return result;
};

export const logout = () => localStorage.removeItem("access_token");

// // ---------------- S3 APIs ----------------
// export interface BucketObjectsResponse {
//   folders: string[];
//   files: string[];
// }

// export const fetchBuckets = async (): Promise<string[]> => {
//   const res = await fetch(`${API_BASE}/buckets`, { headers: getAuthHeaders() });
//   if (!res.ok) throw new Error("Failed to fetch S3 buckets");
//   return res.json();
// };

// export const fetchBucketObjects = async (bucketName: string, prefix?: string): Promise<BucketObjectsResponse> => {
//   let url = `${API_BASE}/buckets/${bucketName}/objects`;
//   if (prefix) url += `?prefix=${encodeURIComponent(prefix)}`;
//   const res = await fetch(url, { headers: getAuthHeaders() });
//   if (!res.ok) throw new Error("Failed to fetch bucket objects");
//   return res.json();
// };

// // ---------------- AZURE BLOB APIs ----------------
// export interface AzureBlobResponse {
//   file_path: string;
// }

// export const fetchAzureContainers = async (): Promise<string[]> => {
//   const res = await fetch(`${API_BASE}/containers`, { headers: getAuthHeaders() });
//   if (!res.ok) throw new Error("Failed to fetch Azure containers");
//   return res.json();
// };

// export const fetchAzureBlobs = async (containerName: string): Promise<string[]> => {
//   const res = await fetch(`${API_BASE}/containers/${containerName}/blobs`, {
//     headers: getAuthHeaders(),
//   });
//   if (!res.ok) throw new Error("Failed to fetch blobs");
//   return res.json();
// };

// export const fetchAzureFilePath = async (containerName: string, blobName: string): Promise<AzureBlobResponse> => {
//   const res = await fetch(
//     `${API_BASE}/containers/${containerName}/file?blob_name=${encodeURIComponent(blobName)}`,
//     { headers: getAuthHeaders() }
//   );
//   if (!res.ok) throw new Error("Failed to get Azure file path");
//   return res.json();
// };
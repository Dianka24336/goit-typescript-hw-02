import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com/";
const API_KEY = "eF1jy8jE9kZhUD2KzOuv3wtZTzynO57krqaJiEczZvQ";

interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description?: string;
}

interface FetchImagesResponse {
  results: Image[];
  total_pages: number;
}

export const fetchImages = async (
  query: string,
  page: number
): Promise<FetchImagesResponse> => {
  const response = await axios.get<FetchImagesResponse>(
    `search/photos?query=${query}&page=${page}&client_id=${API_KEY}`
  );
  return response.data;
};

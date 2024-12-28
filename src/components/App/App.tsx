import { useState } from "react";
import { useEffect } from "react";
import { fetchImages } from "../../service/api";
import ImageGallery from "../ImageGallery/ImageGallery";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import { Toaster } from "react-hot-toast";
import s from "./App.module.css";
import ImagesModal from "../ImageModal/ImagesModal";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";

interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description?: string;
}

const App= () => {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [largeImageURL, setLargeImageURL] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const getData = async () => {
      if (!query.trim()) return;
      try {
        setIsLoading(true);
        setIsError(false);
        const {
          results,
          total_pages,
        }: { results: Image[]; total_pages: number } = await fetchImages(
          query,
          page
        );
        setImages((prev) => [...prev, ...results]);
        setTotalPages(total_pages);
      } catch (error) {
        console.error(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [query, page]);

  const onLoadMore = () => {
    setPage((prev) => prev + 1);
  };

  const handleChangeQuery = (newQuery: string) => {
    setImages([]);
    setQuery(newQuery);
    setPage(1);
  };
  const onImageClick = (image: Image) => {
    setLargeImageURL(image.urls.regular);
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={s.divApp}>
      <Toaster />
      <SearchBar onChangeQuery={handleChangeQuery} />
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={onImageClick} />
      )}
      {isError && <h2>Oops...Something go wrong!!!</h2>}
      {totalPages > page && <LoadMoreBtn onChangeButton={onLoadMore} />}
      {isModalOpen && (
        <ImagesModal
          largeImageURL={largeImageURL}
          closeModal={closeModal}
          onBackdropClick={handleBackdropClick}
        />
      )}
    </div>
  );
};

export default App;

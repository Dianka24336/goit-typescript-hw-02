import ImageCard from "../ImageCard/ImageCard";
import s from "./ImageGallery.module.css";
interface Image {
  id: string;
  urls: {
    regular: string;
    small: string;
  };
  alt_description?: string;
}

interface ImageGalleryProps {
  images: Image[];
  onImageClick: (image: Image) => void;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  onImageClick,
}) => {
  return (
    <div>
      <ul className={s.list}>
        {images.map((image) => (
          <li key={image.id} onClick={() => onImageClick(image)}>
            <ImageCard image={image} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ImageGallery;

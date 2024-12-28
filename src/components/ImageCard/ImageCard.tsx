import s from './ImageCard.module.css'

interface Image {
  id: string;
  urls: {
    small: string;
  };
  alt_description?: string;
}

interface ImageCardProps {
  image: Image;
}
const ImageCard: React.FC<ImageCardProps> = ({image}) => {
  return (
    <div className={s.item}>
       <img 
              src={image.urls.small} 
              alt={image.alt_description || "Image"} 
            />
    </div>
  )
}

export default ImageCard

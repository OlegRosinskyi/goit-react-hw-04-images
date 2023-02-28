import PropTypes from 'prop-types';
import { ImageGalleryItemStiled } from "./ImageGalleryItem.stiled";
import { ImageStiled } from "./ImageGalleryItem.stiled";
const ImageGalleryItems = ({datas} ) =>
{
   // console.log('ImageGalleryItem',datas);
    return (
        <> 
          {datas.map(data => <ImageGalleryItemStiled  key={data.id}> <ImageStiled className="gallery__image" id={data.id} src={data.webformatURL} alt={data.tags} width="360" height="294"loading="lazy" /> </ImageGalleryItemStiled>)}    
        </>
     )
}
export default ImageGalleryItems;
ImageGalleryItems.propTypes = {
    datas:PropTypes.array,
}
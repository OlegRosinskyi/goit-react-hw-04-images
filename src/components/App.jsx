import { useEffect, useState, useRef} from "react";
import PropTypes from 'prop-types';
import { Modal } from "./Modal/Modal";
import { Searchbar } from "./Searchbar";
import ImageGallery from "./ImageGallery/ImageGallery";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Container } from "./App.stiled";
//import { Default } from "react-toastify/dist/utils";

export default function App() {
  const [imageName, setImageName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [articls, setArticls] = useState([{}]);
 const prevImageName = useRef('');
  useEffect(() => {
    if (imageName === '') { console.log('useEffect: порожня строка в imageName'); return; }
    if (prevImageName.current !== imageName) { console.log('useEffect: сброс поискового слова imageName'); setArticls([{}]); prevImageName.current = imageName; }
  }, [imageName])

 const toogleModal = () => { 
    setShowModal(!showModal);
    }; 
  const updateId = (showModal, articls) => {
    setShowModal(showModal); setArticls(articls);
    };
  const updateImage = imageName => {
    //Збереження в state пошукового слова запиту на пошук картинки.
    setImageName(imageName);
    };

  return (
      <Container>
        <Searchbar onSubmit={updateImage}></Searchbar> 
            <ImageGallery imageName={imageName} onClikeImage={updateId}></ImageGallery>
        {showModal && <Modal onClose={toogleModal}> <img src={articls.largeImageURL} alt={articls.tags} /> </Modal>}
        <ToastContainer/>
      </Container>
    );
}

App.propTypes = {
    onClikeImage:PropTypes.func,
    imageName: PropTypes.string,
    onClose: PropTypes.func, 
}
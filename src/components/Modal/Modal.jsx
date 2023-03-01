//З ПОРТАЛОМ
import { memo,useEffect } from "react";
// створити портал 
import { createPortal } from "react-dom";
import PropTypes from 'prop-types';
import { Backdrop } from "./Modal.stiled";
import { ModalWindous } from "./Modal.stiled";
const modulRoot = document.querySelector('#modal-root');

const  Modal = memo(function Modal({ onClose,children }) {
    useEffect(() => {
        window.addEventListener('keydown', handleKeydown); return () => {
      window.removeEventListener('keydown', handleKeydown);
    };},[])
     

    
    const handleKeydown = event => {
            if (event.code === 'Escape')
            {
               // console.log('{Закриття модалки Escape}');
                onClose();
            }
        }     
      const  handleBackdropClick = event => {
            if (event.target === event.currentTarget) {
                //console.log('{Click in Backdrop}');
                onClose();
            }
        } 
         return createPortal(<>
                <Backdrop onClick={handleBackdropClick}>
                    <ModalWindous>{children}</ModalWindous>
                </Backdrop>
                </>,modulRoot)  
});
 Modal.propTypes = {
     children: PropTypes.array,
     onClose:PropTypes.func,
}
export default Modal;
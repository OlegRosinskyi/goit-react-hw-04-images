import styled from "styled-components";

export const ImageGalleryItemStiled = styled.li `display: flex;
  flex-direction: column;
  
   align-items: center;

 @media screen and (min-width: 480px) {
width: calc((100% - 60px) / 2);
  height: 100px;
  };



  @media screen and (min-width: 768px) {
  width: calc((100% - 64px) / 3);
  height: 120px;
  };



  @media screen and (min-width: 1200px) {
  width: calc((100% - 40px) / 4);
  height: 160px;
  };`


 
 
export const ImageStiled = styled.img ` display:block;  width:100%; height: 100%;`
   
   


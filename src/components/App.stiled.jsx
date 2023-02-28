import styled from "styled-components";
export const Container =
    styled.div   ` display:flex; flex-direction:column; 
  width: 1200px;
 @media screen and (min-width: 320px) {
    max-width: 320px;
    padding: 0px 20px;
   
  }

  @media screen and (min-width: 768px) {
    max-width: 768px;
    padding: 0px 30px;
   
  }

  @media screen and (min-width: 1280px) {
    max-width: 1280px;
    padding: 0px 30px;
  
  }
  padding-left: 15px;
  padding-right: 15px;
  margin-left: auto;
  margin-right: auto;
 // background-color: rgb(247, 244, 244);
 ` 
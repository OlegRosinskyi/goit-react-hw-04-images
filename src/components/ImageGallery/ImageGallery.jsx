import { useEffect, useState, useRef, useCallback } from "react";
import PropTypes from 'prop-types';
import ImageGalleryItems from "components/ImageGalleryItem/ImageGalleryItem";
import axiosImages from "components/axiosImages";
import { ImageGalleryStiled } from "./ImageGallery.stiled";
import Button from "components/Button/Button";
import Loader from "components/Loader/Loader";
import { BoxButton } from "./ImageGallery.stiled";
const namberPerPage = 12;

export default function ImageGallery({imageName,onClikeImage}) {
 
    const [articls, setArticls] = useState([]);
    const [namberPage, setNamberPage] = useState(1);
    const [activID,setActivID] = useState('');
    const [error, setError] = useState(null);
   
    const pageTotalSet = useRef(0);
    const statusSet = useRef('idle');
    const showModal = useRef(false);
    const prevImageName = useRef('');
    const prevNamberPage = useRef('1');
    const prevActivID = useRef('');
   
const searchImage = useCallback( async (imageName, namberPage, namberPer_page,) => {
       
       try { 
            statusSet.current='pending';
            let res = await axiosImages(imageName, namberPage, namberPer_page);
            let articlsN = res.data.hits;
           
            if (Number(prevNamberPage.current) !== 1) setArticls(articls.concat(articlsN));   
            else setArticls(articlsN);                               
              statusSet.current='resolved';//стан отримані дані з бекендку
            if (Number(prevNamberPage.current) === 1) {
                let dataTotal = res.data.total;
                let datatotalHits = res.data.totalHits;
            if (dataTotal > datatotalHits) {
                pageTotalSet.current=(Math.ceil(datatotalHits / namberPerPage));
            } else {
                pageTotalSet.current=(Math.ceil(dataTotal / namberPerPage));
                }// console.log(pageTotalSet.current);
        }   
      } catch (error) {
           console.log(error.message);
           //дані з бекендку не отримано, помилка
           statusSet.current='rejected';
           setError(error.message);
       }
 },[articls] );
    
   const updateNamberPage = namberPage => {
    //Збереження в state пошукового слова запиту на пошук картинки.
        setNamberPage(namberPage);
    }
    //Отримання данних про вибрану картинку
    const lookImage = event => {
        if (event.target.id !== '') {
           // console.log('картка вибрана');
            setActivID(event.target.id); showModal.current=true;
        };
    };


    useEffect(() => {
        if (imageName === '') {  statusSet.current = 'idle';return; }
       // console.log(prevImageName.current);
        if (prevImageName.current !== imageName) {
           // console.log('useEffect: prevImageName.current !== imageName');
            prevImageName.current = imageName;
            pageTotalSet.current=0;statusSet.current='idle';showModal.current=false;
          
            setArticls([]); setActivID(''); setError(null);
            // console.log('namberPage-1',namberPage,',',namberPage !== 1);
            if (namberPage !== 1) {setNamberPage(1); if (Number(prevNamberPage.current) !== 1) prevNamberPage.current=1;} 
            //searchImage(prevImageName.current, namberPage, namberPerPage);
            searchImage(prevImageName.current, prevNamberPage.current, namberPerPage);  return;
        } else{
        if (Number(prevNamberPage.current) !== namberPage) {
            prevNamberPage.current=namberPage;
            statusSet.current = 'idle';  setActivID('');
            searchImage(prevImageName.current, prevNamberPage.current, namberPerPage);
            }
            }
        if (prevActivID.current !== activID) {

            prevActivID.current = activID;
            console.log(prevActivID.current);
            let array = { };
            if (prevActivID.current !== '') { array = articls.find(articl => articl.id === Number(prevActivID.current));}
             onClikeImage( showModal.current,array,);
            showModal.current=false;
        }
    }, [imageName,activID,articls,namberPage,searchImage,onClikeImage ])
   
 
   
        if (statusSet.current === 'idle'){return <BoxButton><h2>Для пошуку картинки введить в поле пошуку назву картинки</h2></BoxButton> };   
       
    //console.log(articls); console.log((namberPage !== pageTotalSet.current && Number(articls.length) !== 0));
        if (statusSet.current === 'resolved'){
            return (
            Number(articls.length) === 0?<BoxButton> <h2>Пошук картинки по слову  {imageName} не дав результату</h2></BoxButton>:
            <div> 
            <ImageGalleryStiled onClick={lookImage}>
                <ImageGalleryItems datas={articls}></ImageGalleryItems>
            </ImageGalleryStiled>
            {(namberPage !== pageTotalSet.current && Number(articls.length) !== 0)&&<BoxButton><Button namberPage={namberPage}  imageName={imageName}  onClike={updateNamberPage}/></BoxButton> }
            </div>
        )
        };
        if (statusSet.current === 'rejected') { return <div> <h2>Помилка {error} при пошуку картинки по назві - {imageName} </h2></div> };
        if (statusSet.current === 'pending') { return <BoxButton><Loader></Loader></BoxButton> };
}
 Button.propTypes = {
    error:PropTypes.string,
    imageName: PropTypes.string,
     updateNamberPage: PropTypes.func, 
}
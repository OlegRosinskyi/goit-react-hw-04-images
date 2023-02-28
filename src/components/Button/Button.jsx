
import PropTypes from 'prop-types';
import { ButtonStiled } from "./Button.stiled";

export default function Button ({onClike,namberPage}) {
//export class Button extends Component{
     
    const updateNamberPage = () => {  onClike(namberPage + 1); };

    return (
        <> 
            <ButtonStiled type="button" onClick={updateNamberPage}>Load more</ButtonStiled>             
        </> 
     )}
 Button.propTypes = {
     onClike: PropTypes.func,
     namberPage:PropTypes.number,
   

}

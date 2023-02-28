import { Component } from "react";
import PropTypes from 'prop-types';
import {AiOutlineSearch} from "react-icons/ai";
import { SearchbarInput } from "./Searchbar.stiled";
import { SearchbarBox } from "./Searchbar.stiled";
import { SearchbarForm } from "./Searchbar.stiled";
import { Searchbarbutton } from "./Searchbar.stiled";
import { toast } from "react-toastify";


export class Searchbar extends Component
{
    state = {
        imageName: '',
    }
//componentDidMount() {console.log('componentDidMount Searchbar') };
  //  componentDidUpdate() { console.log('componentDidUpdate Searchbar') };

    hendleSubmit = (event) => {
        event.preventDefault();
        if (this.state.imageName.trim() === '') {toast.error('Введите название картинки' ); return; }
        this.props.onSubmit(this.state.imageName.trim());
       this.resetSearchImage();
       // event.currentTarget.value = '';
    };
    searchImage = (event) => { this.setState({ imageName: event.currentTarget.value }); };
    resetSearchImage = () => { this.setState({ imageName: '', }); };
    
    render(){
    return (
        
            <SearchbarBox>
            <SearchbarForm onSubmit={this.hendleSubmit}>
                <Searchbarbutton type="submit">
                    <span className="button-label"><AiOutlineSearch/></span>
                </Searchbarbutton>

                <SearchbarInput
                   
                className="input"
                type="text"
                autocomplete="off"
                placeholder="Search images and photos"
                value={this.state.imageName}
                onChange={this.searchImage}        
                />
            </SearchbarForm>
        </SearchbarBox>  
        
     )}
}
 Searchbar.propTypes = {
    onChange: PropTypes.func, 
}
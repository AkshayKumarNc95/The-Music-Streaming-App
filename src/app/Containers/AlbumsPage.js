import React, { PureComponent } from 'react';
import GenericComponent from '../Components/GenComp';

class AlbumsPage extends PureComponent{

    constructor(props){
        super(props);
        this.state = {};
    }


    render(){
        return(
            <div> 
                {/* Pass Album props */}
            <GenericComponent />
            </div>
        )
    }
}


export default AlbumsPage; 

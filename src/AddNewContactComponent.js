import React, { Component } from 'react';
import NewContactComponent from './NewContactComponent';

class AddNewContactComponent extends Component {
    state = { 
        newContact: false
     }
     addContact = () => {
        this.setState({newContact: true})
     }

     addNewContact = () => {
         let addContact = <button onClick={this.addContact}>Add</button>  
         
         if(this.state.newContact){ 
            addContact=<NewContactComponent/>
         }
         return (             
            addContact  
         )
     }

    render() { 
        return (  
            <div>
                {this.addNewContact()}
            </div>
        );
    }
}
 
export default AddNewContactComponent;
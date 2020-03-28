import React, { Component } from 'react';


class NewContactComponent extends Component {   

    constructor(props){
        super(props)
        this.state = {  
            newContact: this.props.contact
        }
    }

    createContact = () => {
        this.props.handleCreateContact(this.state.newContact)        
    }

    cancelCreate = () => {        
        this.props.hanleCreateCancel();
    }

    handleNameChange = event => {
        let newContact = this.state.newContact;
        newContact.name=event.target.value
        this.setState({newContact: newContact });
    }
    
    handleEmailChange = event => {
        let newContact = this.state.newContact;
        newContact.email=event.target.value
        this.setState({newContact: newContact });
    }

    handlePhoneChange = event => {
        let newContact = this.state.newContact;
        newContact.phone=event.target.value
        this.setState({newContact: newContact });
    }

    handleCompanyChange = event => {
        let newContact = this.state.newContact;
        newContact.company=event.target.value
        this.setState({newContact: newContact });
    }

    render() { 
        
        return (              
                <tr>                    
                    <td>
                        <input type="text" name="name" onChange={this.handleNameChange} value={this.state.newContact.name}/>
                    </td>
                    <td>
                        <input type="text" name="email" onChange={this.handleEmailChange} value={this.state.newContact.email}/>
                    </td>
                    <td>
                        <input type="text" name="phone" onChange={this.handlePhoneChange} value={this.state.newContact.phone}/>
                    </td>
                    <td>
                        <input type="text" name="company" onChange={this.handleCompanyChange} value={this.state.newContact.company}/>
                    </td>
                    <td>
                        <button onClick={this.createContact}>Submit</button>
                        &nbsp;  
                        <button onClick={this.cancelCreate}>Cancel</button>
                    </td>
                </tr>                   
        )
    }
}
 
export default NewContactComponent;
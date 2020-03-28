import React, { Component } from 'react';

class TableRowComponent extends Component {
    
    constructor(props){
        super(props)                
    }
    
    render() { 
        const {name, email, phone, company} = this.props.contact
     
        return ( 
            <tr>
                <td>{name}</td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{company}</td>
                <td>
                    <button onClick={() => this.props.handleEditContact(this.props.contact)}>Edit</button>&nbsp;
                    <button onClick={ () => this.props.handleDeleteContact(this.props.contact)}>Delete</button>
                </td>
            </tr>
         );
    }
}
 
export default TableRowComponent;
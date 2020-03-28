import React, { Component } from 'react';
import TableRowComponent from './TableRowComponent';
import axios from 'axios';

import NewContactComponent from './NewContactComponent';

class TableComponent extends Component {

    state = { 
        contacts: [],
        addNew: false,
        isEditContact: false,
        editContact: null
     }

    componentWillMount() {
        this.getAllContacts();
    }

    addContact = () => {
        this.setState({
            addNew: true,
            isEditContact: false
        })
    }

    getAllContacts = () => {
        axios.get('http://localhost:3000/contacts').then((response) => {
            let receivedContacts = response.data;
            let parsedContacts = [];
            if (receivedContacts) {
                receivedContacts.map((contact) => {
                    parsedContacts.push({
                        id: contact.id,
                        name: contact.name,
                        email: contact.email,
                        phone: contact.phone,
                        company: contact.company.name
                    });
                });
            }
            this.setState({ contacts: parsedContacts });
        });
    }
    handleCreateContact = (newContact) => {
        let contact = {
            id: newContact.id,
            name: newContact.name,
            email: newContact.email,
            phone: newContact.phone,
            company: {
                name: newContact.company
            }
        }
        
        if(this.state.isEditContact){
            this.editContactUpdate(contact)
        }else{
            this.createContact(contact);
        }        
    }

    editContactUpdate = (contact) => {
        axios.put(`http://localhost:3000/contacts/${contact.id}`, contact).then(response => {
            console.log('Sucessfully udpated');
            this.setState({
                addNew: false,
                isEditContact: false
            });
            this.getAllContacts();
        }, err => {
            console.log(err);
        });
    }

    handleCancel = () => {
        this.setState({
            addNew: false,
            isEditContact: false
        })     
    }

    handleDeleteContact = (contact) => {
        axios.delete(`http://localhost:3000/contacts/${contact.id}`).then(
            response => {
                this.getAllContacts();
            },
            err => {
                console.log(err)
            }
        )
    }

    handleEditContact = (contact) => {
        this.setState({
            isEditContact: true,
            editContact: contact
        })
    }

    hanleEditCancel = () => {
        this.getAllContacts()
    }

    createContact = (contact) => {
        axios.post('http://localhost:3000/contacts', contact).then(response => {
            console.log('Sucessfully udpated');
            this.setState({
                addNew: false,
                isEditContact: false
            });
            this.getAllContacts();
        }, err => {
            console.log(err);
        });
    }

    render() {
        return (
            <div>
                <table border='1'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.contacts.map((contact) => {
                                let rowComponent =  <TableRowComponent 
                                                                            key={contact.id} 
                                                                            contact={contact} 
                                                                            handleDeleteContact={this.handleDeleteContact}  
                                                                            handleEditContact={this.handleEditContact} />      
                                if(this.state.isEditContact && contact.id === this.state.editContact.id){
                                    rowComponent = <NewContactComponent 
                                                                            key={contact.id}
                                                                            contact={contact}
                                                                            isEditContact={this.state.isEditContact}
                                                                            handleCreateContact={this.handleCreateContact} 
                                                                            hanleCreateCancel={this.handleCancel}
                                                                            />
                                }
                                return (                                    
                                        rowComponent                            
                                )
                            })                       
                        } 
                        {
                            this.state.addNew && 
                                <NewContactComponent 
                                    contact={{
                                        name:'',
                                        email: '',
                                        phone: '',
                                        company: ''   
                                    }} 
                                    handleCreateContact={this.handleCreateContact}
                                    hanleCreateCancel={this.handleCancel}/>
                        }                       
                        
                    </tbody>
                </table>
                {
                    this.state.addNew == false && <button onClick={this.addContact}>Add</button>  
                }
                
            </div>
        );
    }
}

export default TableComponent; 

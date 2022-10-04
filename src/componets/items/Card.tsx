import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Avatar, Card, Modal } from 'antd';
import React, { useState } from 'react';
import {  useDeleteContactMutation, useEditContactMutation } from '../../store/api/contacts.api';

const { Meta } = Card;

interface CardComponentProps {
  id:number,
  firstName:string,
  surName:string,
  phone:string,
}

const CardComponent: React.FC<CardComponentProps> = ({firstName,surName,phone,id}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [newFirstName, setNewFirstName] = useState('');
  const [newSurName, setNewSurName] = useState('');
  const [newPhone, setNewPhone] = useState('');

  const [deleteContact] = useDeleteContactMutation()
  const [editContact] = useEditContactMutation()

  
  const handleDeleteContact = async (id:number) => {
    await deleteContact(id).unwrap()
  }

  const openModal = () => {
    setModalOpen(true)
    setNewFirstName(firstName)
    setNewSurName(surName)
    setNewPhone(phone)


  }

  const handleEditContact = async () =>{
    if(newFirstName){
      await editContact({id,firstName:newFirstName,surName:newSurName,phone:newPhone})
      setModalOpen(false)
    } else{
      const warning = () => {
        Modal.warning({
          content: 'some messages...some messages...',
        });
      };
      warning()
    }
  }

  return (
    <>
      <Card
        style={{ width: 300, margin:0 }}
        actions={[
          <EditOutlined key="edit" onClick={openModal}/>,
          <DeleteOutlined key='delete' onClick={()=>handleDeleteContact(id)}/>
        ]}
      >
        <Meta
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={firstName + ' ' + surName}
          description={phone}
        />
      </Card>
      <Modal
        title="Редактировать"
        centered
        open={modalOpen}
        onOk={handleEditContact}
        onCancel={() => setModalOpen(false)}
        okText={'Готово'}
        cancelText='Отменить'
      >
        <div className='input-box d-flex flex-column'>
          <input type="text" placeholder='Имя' value={newFirstName} onChange={(e)=>setNewFirstName(e.target.value)}/>
          <input type="text" placeholder='Фамилия' value={newSurName} onChange={(e)=>setNewSurName(e.target.value)}/>
          <input type="text" placeholder='Телефон' value={newPhone} onChange={(e)=>setNewPhone(e.target.value)}/>
        </div>
      </Modal>
    </>
  );
};

export default CardComponent;
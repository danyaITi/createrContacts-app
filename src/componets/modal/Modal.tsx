import { Button, Modal,message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useAddContactMutation } from '../../store/api/contacts.api';
import { RootState } from '../../store/store';
import './Modal.scss'

const ModalComponent: React.FC = () => {
  const userId = useSelector((state:RootState)=> state.auth.userInfo?.id) 
  const [firstName, setFirstName] = useState('');
  const [surName, setSurName] = useState('');
  const [phone, setPhone] = useState('');

  const [modalOpen, setModalOpen] = useState(false);
  const [addContact] = useAddContactMutation()

  const success = () => {
    message.success('Новый контакт успешно создан');
  };

  const handleAddContact = async () => {
    if(firstName){
      await addContact({firstName,surName,phone,userId}).unwrap()
    } 
    setModalOpen(false)
    setFirstName('')
    setSurName('')
    setPhone('')
    success()
  }

  
   

  return (
    <>
      <Button type="primary" onClick={() => setModalOpen(true)}>
        Создать новый контакт
      </Button>
      <Modal
        title="Контакт"
        centered
        open={modalOpen}
        onOk={handleAddContact}
        onCancel={() => setModalOpen(false)}
        okText={'Готово'}
        cancelText='Отменить'
      >
        <div className='input-box d-flex flex-column'>
          <input type="text" placeholder='Имя' value={firstName} onChange={(e)=>setFirstName(e.target.value)}  />
          <input type="text" placeholder='Фамилия' value={surName} onChange={(e)=>setSurName(e.target.value)}/>
          <input type="text" placeholder='Номер телефона' value={phone} onChange={(e)=>setPhone(e.target.value)} />
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
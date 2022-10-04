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

  const warning = () => {
    message.warning('Введите имя');
  };

  const closeModal = () =>{
    setModalOpen(false)
    setFirstName('')
    setSurName('')
    setPhone('')
  }

  const handleAddContact = async () => {
    if(firstName){
      await addContact({firstName,surName,phone,userId}).unwrap()
      success()
      closeModal()
    } else{
      warning()
    }
  }
  
  const changePhoneInput = () =>{
    setPhone('+7')
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
        onCancel={closeModal}
        okText={'Готово'}
        cancelText='Отменить'
      >
        <div className='input-box d-flex flex-column'>
          <input type="text" placeholder='Имя' value={firstName} onChange={(e)=>setFirstName(e.target.value)}  />
          <input type="text" placeholder='Фамилия' value={surName} onChange={(e)=>setSurName(e.target.value)}/>
          <input type="text" onClick={changePhoneInput} placeholder='+7 999 999 999' value={phone} onChange={(e)=>setPhone(e.target.value)} />
        </div>
      </Modal>
    </>
  );
};

export default ModalComponent;
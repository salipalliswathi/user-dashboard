import './css/add-or-edit-user.scss'
import { useEffect, useMemo, useState } from 'react'
export default function AddOrEditUserPopup ({isEdit, callAddUserAPi, userInfo}) {
  const [userData, setUserData] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })
  const isSaveBtnDisabled = useMemo(() => {
    return !userData.first_name?.length || !userData.last_name?.length || !userData.email?.length
  }, [userData])
  const addUser = () => {
    callAddUserAPi(userData)
  }
  useEffect(() => {
    if (isEdit && Object.keys(userInfo).length) {
      console.log(userInfo, 'inchild')
      setUserData({...userInfo, first_name: userInfo.first_name, last_name: userInfo.last_name})
    }
  }, [isEdit, userInfo])
  return (
    <div className='popup'>
      <div className='popup__content'>
        <div className='popup__content__title'>{isEdit ? 'Edit User': 'Add User'}</div>
        <div className='popup__content__form'>
          <div className="input">
            <div className='input__title'>first_name</div>
            <input className="input__handler" type="text" value={userData.first_name} onChange={(e) => setUserData({...userData, first_name:e.target.value})}/>
          </div>
          <div className="input">
            <div className='input__title'>last_name</div>
            <input className="input__handler" type="text" value={userData.last_name} onChange={(e) => setUserData({...userData, last_name:e.target.value})}/>
          </div>
          <div className="input">
            <div className='input__title'>email</div>
            <input className="input__handler" type="email" value={userData.email} onChange={(e) => setUserData({...userData, email:e.target.value})}/>
          </div>
        </div>
        <div className='popup__content__footer'>
          <button className="add-btn" onClick={()=> addUser()} disabled={isSaveBtnDisabled}>{isEdit ? 'Save' : 'Add'}</button>
        </div>
      </div>
    </div>
  )
}
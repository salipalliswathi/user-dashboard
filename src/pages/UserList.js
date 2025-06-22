import { useEffect, useState, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, addUserThunk, updateUsers } from "../redux/userSlice"
import AddOrEditUserPopup from "../components/AddOrEditUserPopup"
import './css/UserList.scss'
export default function UserList () {

  const {users} = useSelector(state => state.user)
  const dispatch = useDispatch()

  const [userList, setUserList] = useState([])
  const [searchText, setSearchText] = useState('')
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [isEditUser, setIsEditUser] = useState(false)
  const [userData, setUserData] =  useState({
    first_name: '',
    last_name: '',
    email: ''
  })

  const debounceRef = useRef(null)
  
  const resetSearch = () => {
    setSearchText('')
    setUserList(JSON.parse(JSON.stringify(users)))
  }
  const searchUser = (e) => {
    const value = e.target.value
    setSearchText(value)
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }
    debounceRef.current = setTimeout(() => {
      const filterdUsers = users.filter((item) => item.first_name.toLowerCase().includes(value) || item.last_name.toLowerCase().includes(value))
      setUserList(filterdUsers)
    }, 1000)
  }
  const addUser = useCallback((userInfo) => {
    const userDetails = JSON.parse(JSON.stringify(userInfo))
    userDetails['name'] = userDetails.first_name
    userDetails['job'] = 'software engineer'
    toggleAddOrEditUserPopup()
    dispatch(addUserThunk({
      data: userDetails,
      callBack: onAddingUserSuccess
    }))
  }, [dispatch])
  const onAddingUserSuccess = () => {

    console.log('added user successfully')
  }
  const editUser = useCallback((userInfo) => {
    toggleAddOrEditUserPopup()
    const indexOfUser = userList.findIndex(item => item.id === userInfo.id)
    if (indexOfUser  !== -1) {
      const updatedUsers = [...userList]
      updatedUsers[indexOfUser] = {
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        avatar: userInfo.avatar
      }
      setUserList(updatedUsers)
      dispatch(updateUsers(updatedUsers))
    }
  })
  const toggleAddOrEditUserPopup = (pageName, userInfo) => {
    setIsPopupOpen(prev => !prev)
    if (pageName === 'add') {
      setIsEditUser(false)
      setUserData({
        first_name: '',
        last_name: '',
        email: '',
        avatar: ''
      })
    }
    if (userInfo) {
      setIsEditUser(true)
      console.log(userInfo, 'userInfo')
      setUserData({
        first_name: userInfo.first_name,
        last_name: userInfo.last_name,
        email: userInfo.email,
        avatar: userInfo.avatar,
        id:  userInfo.id || Date.now()
      })
    }
  }

  useEffect(() => {
    setUserList(users)
  }, [users])

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="user-list">
      {isPopupOpen && <AddOrEditUserPopup isEdit={isEditUser} userInfo={isEditUser ? userData: {}} callAddUserAPi={isEditUser ? editUser: addUser}/>}
      <div className="user-list__title">User List</div>
      <div className="user-list__filters">
        <div>
          <input className="user-list__filters__input" type="text" value={searchText} onInput={(e)=> searchUser(e) }/>
          {searchText?.length ? <span className="user-list__filters__reset" onClick={() => resetSearch()}>Reset</span>: ''}
        </div>
        <div>
          <button className="user-list__filters__add-btn" onClick={() => toggleAddOrEditUserPopup('add')}>Add User</button>
        </div>
      </div>
      <div className="user-list__content">
        {userList.map((item, index) => (
          <div key={index} className="user-list__content__card">
            <div className="user-name">
              <img src={item.avatar} width="50px" height="50px" alt='no-avatar'/>
              <span>{item.first_name}</span> <span>{item.last_name}</span>
            </div>
            <div>{item.email}</div>
            <div className="footer"> 
              <div onClick={() => toggleAddOrEditUserPopup('edit', item)}>Edit</div>
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}
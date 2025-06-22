import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react"

const UserList = lazy(()=> import('../pages/UserList.js'))
export default function AppRoutes () {
  return (
    <div>
      <Suspense fallback={<div>....loading</div>}>
        <Routes>
          <Route path="/user-list" element={<UserList/>}></Route>
        </Routes>
      </Suspense>
    </div>
  )
}  


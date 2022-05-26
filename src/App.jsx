import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home, Landing, NotFound, Wishlist } from "./pages"
// REDUX
import { store } from './app/store'
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Landing/> }/>
          <Route path="/home" element={ <Home/> }/>
          <Route path="/wishlist" element={ <Wishlist/> }/>
          <Route path="*" element={ <NotFound/> }/>
        </Routes>
      </BrowserRouter>
    </Provider>
  )
}

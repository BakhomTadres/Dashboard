import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import RegisterContextProvider from './RegisterContext.tsx'
import TasksContextProvider from './TasksContext.tsx'
import NotificationContextProvider from './NotificationContext.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <NotificationContextProvider>
      <RegisterContextProvider>
        <TasksContextProvider>
          <App />
        </TasksContextProvider>
      </RegisterContextProvider>
    </NotificationContextProvider>
  </BrowserRouter>
)

import { React } from 'react'
import { Helmet } from 'react-helmet'
import { Toaster } from "react-hot-toast";
import Sidebar from './Sidebar';
const Layout = ({children, title, description, keywords, author}) => {
  return (
    <div>
        <Helmet>
          <meta charSet='utf-8'/>
          <div>
            <meta name='description' contant={description}/>
            <meta name='keywords' contant={keywords}/>
            <meta name='author' contant={author}/>
          </div>
          <title>{title}</title>
        </Helmet>
        <Sidebar/>
        <main style={{ minHeight: '80vh' }}>
        <Toaster/>
        {children}
        </main>
    </div>
  )
}

Layout.defaultProps = {
  title: "Ticket Management - Welcome",
  description: "Help organizations to manage incoming support requests",
  keywords: "ticket, helpdesk, manage",
  author: "Nuttanicha",
};

export default Layout
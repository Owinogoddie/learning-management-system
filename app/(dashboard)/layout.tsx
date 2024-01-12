import React from 'react'
import { Sidebar } from './_components/Sidebar'
import { Navbar } from './_components/navbar'

const DashboardLayout = (
    {children}:{children:React.ReactNode}
) => {
  return (
    <div className="h-full">
      <div className="h-[80px] md:pl-56 fixed inset-y-0 z-50 w-full">
        <Navbar/>

      </div>
        <div className="hidden  md:flex h-full w-56 fixed flex-col inset-y-0 z-50">
            <Sidebar/>
        </div>
        <main className="h-full md:pl-56 pt-[80px]">
        {children}
        </main>
    </div>
  )
}

export default DashboardLayout
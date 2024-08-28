'use client'
import React, {useState, useEffect} from 'react'
import AccountingSideBar from './sideBar'
import AccountingDashboardPage from './accountingDashboardPage'
import NotificationPage from '../notificationPage'
import SystemSettings from '../setting'
import DashboardNav from '../dashboardNav'
import InvoicePage from './invoicePage'
import PaymentPage from './paymentPage'
import ExpensesPage from './expensesPage'


const AccountingDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('side_nav')
        if (item == null || item == "" || !['home', 'invoice', 'payment',  'expenses', 'notification', 'settings' ].includes(item) ) {
            setActive('home')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex   items-start justify-between">
            <div className="w-[250px] h-full  ">
                <AccountingSideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
            
                <DashboardNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">

                    {active === "home" && <AccountingDashboardPage /> }
                    {active === "invoice" && <InvoicePage /> }
                    {active === "payment" && <PaymentPage /> }
                    {active === "expenses" && <ExpensesPage /> }

                    {active === "notification" && <NotificationPage /> }
                    {active === "settings" && <SystemSettings /> }
                  

                </div>
            </div>
        </div>
    )
}

export default AccountingDashboard
'use client'
import React, {useState, useEffect} from 'react'
import AccountingNav from './navBar'
import AccountingSideBar from './sideBar'
import AccountingDashboardPage from './accountingDashboardPage'
import ProfitAndLossPage from './profitAndLoss'
import AverageCostPerPage from './averageCostPerPage'
import ProfitMarginPage from './profitMargin'
import LossPage from './lossPage'
import BillsOrInvoicePage from './billsOrInvoice'


const AccountingDashboard = () => {
    const [active, setActive] = useState('')
    useEffect(() => {
        const item = sessionStorage.getItem('sideNav')
        if (item == null || item == "") {
            setActive('dashboard')
        }else{
            setActive(item)
        }
        console.log(active)
    }, [])
    return (
        <div className="w-full h-[100vh] flex flex-row  items-start justify-between">
            <div className="w-[280px] h-full  ">
                <AccountingSideBar active={active} setActive={setActive} />
            </div>
            <div className="flex-1 h-full bg-blue-100">
            
                <AccountingNav />
                <div className="w-full bg-gray-100 overflow-y-auto cont-1">

                    {active === "dashboard" && <AccountingDashboardPage /> }
                    {active === "profit&loss" && <ProfitAndLossPage /> }
                    {active === "averageCostPerPage" && <AverageCostPerPage /> }
                    {active === "profitMargin" && <ProfitMarginPage /> }
                    {active === "loss" && <LossPage /> }
                    {active === "bills&report" && <BillsOrInvoicePage /> }
                  

                </div>
            </div>
        </div>
    )
}

export default AccountingDashboard
import { Sidebar } from '@/components/dashboard/sidebar'
import MainDashboardContainer from '@/components/shared/main-dashboard-container'
import React from 'react'

function ContactPage() {
  return (
    <div>
        <Sidebar role="admin"/>
        <MainDashboardContainer>
            <div>
                <h1>This is the contact page for the company</h1>
                <p>ALl contact message sent will be seen here</p>
            </div>
        </MainDashboardContainer>
    </div>
  )
}

export default ContactPage
import type { AdminViewServerProps } from 'payload'

import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import React from 'react'
import { UmamiIframe } from './UmamiIframe'
  
export const Analytics: React.FC<{ 
  initPageResult: AdminViewServerProps['initPageResult'];
  params: AdminViewServerProps['params'];
  searchParams: AdminViewServerProps['searchParams'];
}> = ({
  initPageResult,
  params,
  searchParams,
}) => {

  if (!initPageResult.req.user) {
    return (
      <Gutter>
        <h1>Unauthorized</h1>
        <p>You need to be logged in to view this page.</p>
      </Gutter>
    )
  }
  


  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}

      visibleEntities={initPageResult.visibleEntities} 
      viewActions={
        ["./app/(payload)/admin/components/Menu"]
      }

      
    >
      <Gutter>
       
        <UmamiIframe
          src="https://us.umami.is/share/3tzcDmlKAufVOoo2/davidmaraga.com"
          height="800px"
        />
      </Gutter>
    </DefaultTemplate>
  )
}
import { FC } from 'react'
import { useQueryNotice } from '../hooks/useQueryNotice'
import { useSubscribeNotice } from '../hooks/useSubscribeNotice'
import { NoticeItem } from './NoticeItem'
import { NoticeForm } from './NoticeForm'

export const Notification: FC = () => {
  const { data: notices } = useQueryNotice()
  useSubscribeNotice()

  return (
    <>
      <p className="mb-4 text-center">Notification</p>
      <NoticeForm />
      <ul data-testid="ul-notice" className="my-5">
        {notices?.map((notice) => (
          <NoticeItem
            key={notice.id}
            id={notice.id}
            content={notice.content}
            user_id={notice.user_id}
          />
        ))}
      </ul>
    </>
  )
}

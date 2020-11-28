import React, { useContext, useEffect } from 'react'
import { ViewContext } from '../../Context/ViewContext'
import { SessionContext } from '../../Context/SessionContext'
import { UserContext } from '../../Context/UserContext'
import { postSession } from '../../apiCalls'
import style from './FocusModal.module.scss'

const FocusModal = () => {
  const setView = useContext(ViewContext)[1]
  const session = useContext(SessionContext)[0] 
  const user = useContext(UserContext)[0]

  useEffect(() => {
    setTimeout(() => setView('timer'), 3000)
    postSession(session, user.userId)
  })

  return (
    <div className={style.workMsgModal}>
      <h2 className={style.modalContent}>
        You're doing great.<br/>
        Get ready to focus. 
      </h2>
    </div>)
}

export default FocusModal;
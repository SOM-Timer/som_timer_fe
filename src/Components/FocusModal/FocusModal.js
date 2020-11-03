import React, { useContext, useEffect } from 'react'
import { ViewContext } from '../../Context/ViewContext'
import { SessionContext } from '../../Context/SessionContext'
import { postSession } from '../../apiCalls'
import style from './FocusModal.module.scss'

const FocusModal = () => {
  const setView = useContext(ViewContext)[1]
  const session = useContext(SessionContext)[0]

  useEffect(() => {
    setTimeout(() => setView('timer'), 5000)
    postSession(session)
  })

  return (
    <div className={style.workMsgModal}>
      <h2 className={style.modalContent}>
        Time to focus again!
      </h2>
    </div>)
}

export default FocusModal;
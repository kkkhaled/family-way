import React, { useState } from 'react'
import { MenuItem, Select, TextField } from '@material-ui/core'
import InputEmoji from 'react-input-emoji'
import Axios from 'axios'
import { url } from '../constants/constants'

const PushNotification = () => {
  const [chosenEmoji, setChosenEmoji] = useState(null)
  const [message, setMessage] = useState('')
  const [messageTwo, setMessageTwo] = useState('')
  const [forAll, setForAll] = useState('للجميع')
  const [phoneNumber, setPhoneNumber] = useState('')

  const handlePushNotification = async () => {
    try {
      const data = {}
      if (forAll == 'للجميع') {
        data.notification = {
          bigText: message,
          title: messageTwo
        }
      } else {
        data.forOne = true
        data.phoneNumber = phoneNumber
        data.notification = {
          bigText: message,
          title: messageTwo
        }
      }
      console.log(data)
      const response = await Axios.post(`${url}notification`, data)
      console.log(response.data)
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className='push-notification'>
      <h1></h1>
      <div style={{ width: '50%', marginTop: 400 }}>
        <Select
          style={{ margin: '8px' }}
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          defaultValue='للجميع'
          value={forAll}
          fullWidth
          onChange={text => setForAll(value => (value = text.target.value))}
        >
          <MenuItem value={'للجميع'}>للجميع</MenuItem>
          <MenuItem value={'لشخص واحد'}>لشخص واحد</MenuItem>
        </Select>
        <InputEmoji
          value={message}
          onChange={text => setMessage(value => (value = text))}
          cleanOnEnter
          onEnter={() => handlePushNotification()}
          placeholder='النص الرئيسي'
        />
        <InputEmoji
          value={messageTwo}
          onChange={text => setMessageTwo(value => (value = text))}
          cleanOnEnter
          onEnter={() => handlePushNotification()}
          placeholder='النص الفرعي'
        />
        {forAll != 'للجميع' ? (
          <TextField
            id='standard-basic'
            label='رقم الهاتف'
            fullWidth
            style={{ margin: '8px' }}
            onChange={text => {
              text.persist()
              setPhoneNumber(val => (val = text.target.value))
              console.log(phoneNumber)
            }}
          />
        ) : null}

        <button
          style={{ padding: 10, margin: 10, display: 'block' }}
          onClick={() => handlePushNotification()}
        >
          send notification
        </button>
      </div>
    </div>
  )
}
export default PushNotification

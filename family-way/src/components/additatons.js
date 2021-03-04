import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { url, urlImages } from '../constants/constants'
import { constantsContext } from '../contexts/constants/constantState'
import moment from 'moment'
import 'moment/locale/ar'

const Additatons = () => {
  const [files, setFiles] = useState([])
  const [productsFiles, setProductsFiles] = useState([])
  const { getConstant, constants } = useContext(constantsContext)

  const getFiles = async () => {
    try {
      const response = await axios.get(`${url}exportUsers`)
      const productsResponse = await axios.get(`${url}productsRoute`)
      setFiles(value => (value = response.data))
      setProductsFiles(value => (value = productsResponse.data))
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getConstant()
    getFiles()
  }, [])

  const deleteFile = async (action, name) => {
    try {
      if (action == 'user') {
        const responseUser = await axios.delete(`${url}exportUsers/${name}`)
      } else {
        const responseProducts = await axios.delete(
          `${url}productsRoute/${name}`
        )
      }
      getFiles()
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <div className='containerFiles'>
        <h5>رسايل الأشعارات</h5>
        <div></div>
        <h5>ملفات المستخدمين</h5>
        <div>
          {files.map(file => {
            return (
              <div
                key={file}
                style={{
                  margin: 10,
                  padding: 10,
                  border: '1px solid rgba(0,0,0,15)',
                  justifyContent: 'space-between',
                  display: 'flex'
                }}
              >
                <p style={{ margin: 0 }}>{file.replace('.xls', '')}</p>
                {/* <p style={{ margin: 0, fontSize: 13 }}>
                  التوقيت :
                  {moment(
                    new Date().toISOString(file.replace('.xls', ''))
                  ).format('MMMM Do YYYY, h:mm:ss a')}
                </p> */}
                <a
                  href={`${urlImages}excelFilesForUsers/${file}`}
                  target='_blank'
                  style={{ color: '#000' }}
                >
                  تحميل البيانات
                </a>
                <button onClick={() => deleteFile('user', file)}>حذف</button>
              </div>
            )
          })}
        </div>
      </div>
      <h5>ملفات المنتجات</h5>
      <div>
        {productsFiles.map(file => {
          return (
            <div
              key={file}
              style={{
                margin: 10,
                padding: 10,
                border: '1px solid rgba(0,0,0,15)',
                justifyContent: 'space-between',
                display: 'flex'
              }}
            >
              <p style={{ margin: 0 }}>{file}</p>
              {/* <p style={{ margin: 0, fontSize: 13 }}>
                التوقيت :
                {moment(new Date().toISOString(file)).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </p> */}
              <a
                href={`${urlImages}excelFilesForProducts/${file}`}
                target='_blank'
                style={{ color: '#000' }}
              >
                تحميل البيانات
              </a>
              <button onClick={() => deleteFile('product', file)}>حذف</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Additatons

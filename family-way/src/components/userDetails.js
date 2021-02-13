import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { url, urlImages } from '../constants/constants'
import { makeStyles } from '@material-ui/core/styles'
import moment from 'moment'
import 'moment/locale/ar'

const useStyle = makeStyles(theme => ({
  container: {},
  meGrid: {
    display: 'flex',
    alignItems: 'center',
    margin: '12px 0'
  },
  containerOrder: {
    padding: 8,
    width: '100%',
    border: '1px solid rgba(0,0,0,.25)',
    margin: '10px 0px'
  },
  containerOneOrder: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr'
  },
  oneOrder: {
    margin: 6,
    border: '1px solid rgba(0,0,0,.25)',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  h: {
    margin: 0,
    marginRight: 12
  },
  p: {
    margin: 0,
    color: '#717171'
  },
  orderImage: {
    height: 150,
    objectFit: 'contain'
  },
  orderName: {
    margin: 0
  },
  orderCount: {
    margin: 0,
    color: '#E91E63'
  },
  orderPrice: {
    margin: 0,
    color: '#30d158'
  },
  orderTotalPrice: {
    margin: 0,
    color: '#03A9F4'
  },
  collectDataOrder: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 6
  },
  oneP: {
    margin: '3px 6px',
    border: '1px solid rgba(0,0,0,.1)',
    padding: 4,
    color:"#717171"
  }
}))

const UserDetails = () => {
  const classes = useStyle()
  const [loadingUser, setLoading] = useState(false)
  const [user, setUser] = useState(null)
  useEffect(() => {
    setLoading(value => (value = true))
    const getThisUser = async id => {
      try {
        const response = await axios.get(`${url}oneUser/${id}`, {
          headers: {
            Authorization: 'Bearer ' + (await localStorage.token)
          }
        })
        setUser(value => (value = response.data))
        console.log(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    const getMyUser = async () => {
      const path = window.location.pathname
      const _id = path.replace('/user-details/', '')
      await getThisUser(_id)
    }
    getMyUser()
    setLoading(value => (value = false))
  }, [])

  const getUserOrders = orders => {
    if (orders.length != 0 && orders != undefined) {
      return orders.map((item, index) => {
        return (
          <div className={classes.containerOrder} key={item._id}>
            {/* <p className={classes.p}>{item.expectedMoney}</p> */}
            <div>
              <h4 style={{ margin: 0, marginBottom: 10 }}>تفاصيل الطلب</h4>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <p className={classes.oneP}>الطلب رقم : {index + 1}</p>
                <p className={classes.oneP}>
                  وقت الطلب :{' '}
                  {moment(item.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
                </p>
                <p className={classes.oneP}>كود الطلب : {item.id}</p>
                <p className={classes.oneP}>تقييم الطلب : {item.productRate}</p>
                <p className={classes.oneP}>تقييم الموصل : {item.driverRate}</p>

                <p className={classes.oneP}>
                  هل استخدم كوبون ؟ : {item.isCoupon ? 'نعم' : 'لا'}
                </p>
                <p className={classes.oneP}>استخدام المحفظه : {item.wallet}</p>
                <p className={classes.oneP}>استخدام النقاط : {item.points}</p>
                <p className={classes.oneP}>سعر التوصيل : {item.delivery}</p>
                <p className={classes.oneP}>
                  سعر المنتجات : {item.productsCost}
                </p>
                <p className={classes.oneP} style={{fontWeight:900,color:"#E91E63"}}>
                  سعر الطلب بالكامل : {item.totalCost}
                </p>
              </div>
            </div>
            <div className={classes.containerOneOrder}>
              {item.items.map(product => {
                return (
                  <div key={product._id} className={classes.oneOrder}>
                    <img
                      src={`${urlImages}products/${product.image}`}
                      className={classes.orderImage}
                    />
                    <div className={classes.collectDataOrder}>
                      <p className={classes.orderName}>{product.title}</p>
                      <p className={classes.orderCount}>
                        العدد : {product.count}{' '}
                      </p>
                    </div>
                    <div className={classes.collectDataOrder}>
                      <p className={classes.orderPrice}>
                        سعر القطعه : {product.price}
                      </p>
                      <p className={classes.orderTotalPrice}>
                        السعر بالكامل : {product.totalPrice}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })
    }
  }
  return (
    <div>
      {user ? (
        <div className={classes.container}>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> تم انشاء حسابه في تاريخ : </h5>
            <p className={classes.p}>
              {moment(user.createdAt).format('MMMM Do YYYY, h:mm:ss a')}
            </p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> الحاله : </h5>
            <p className={classes.p}>
              {user.role == 'ADMIN' ? 'ادمن' : 'مسخدم'}
            </p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> كود الأستدعاء : </h5>
            <p className={classes.p}>{user.codeInvites}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> هل املاء البيانات : </h5>
            <p className={classes.p}>{user.filledForm ? 'نعم' : 'لا'}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> هل هوا محظور : </h5>
            <p className={classes.p}>{user.isBlocked ? 'نعم' : 'لا'}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> هل احد استدعاه ؟ : </h5>
            <p className={classes.p}>{user.isInvited ? 'نعم' : 'لا'}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> نظام التشغيل : </h5>
            <p className={classes.p}>
              {user.os == 'android' ? 'اندرويد' : 'ابل'}
            </p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> رقم الهاتف : </h5>
            <p className={classes.p}>{user.phone}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> العمر : </h5>
            <p className={classes.p}>{user.age}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> اسم المدينه : </h5>
            <p className={classes.p}>{user.currentCity}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> البريد الألكتروني : </h5>
            <p className={classes.p}>{user.email}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> حساب الانستجرام : </h5>
            <p className={classes.p}>{user.instagram}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> الجنسيه : </h5>
            <p className={classes.p}>{user.nationality}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> النقاط : </h5>
            <p className={classes.p}>{user.points}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> المحفظه : </h5>
            <p className={classes.p}>{user.wallet}</p>
          </div>
          <div className={classes.meGrid}>
            <h5 className={classes.h}> عدد الطلبات : </h5>
            <p className={classes.p}>{user.orders.length}</p>
          </div>
          <div>{getUserOrders(user.orders)}</div>
          {/* <div className={classes.meGrid}>
            <h5 className={classes.h}> كود الأستدعاء : </h5>
            <p className={classes.p}>{user.codeInvites}</p>
          </div> */}
        </div>
      ) : null}
    </div>
  )
}

export default UserDetails

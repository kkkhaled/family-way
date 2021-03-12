 export const url = 'http://localhost:8080/api/user/'
 export const urlImages = 'http://localhost:8080/uploads/'

// export const url = 'localhost:8080/api/user/'
// export const urlImages = 'localhost:8080/uploads/'

export const convertPaymentText = value => {
  let result
  switch (value) {
    case 1: {
      result = 'عند الأستلام'
      break
    }
    case 2: {
      result = 'بالبطاقة عند الأستلام'
      break
    }
    case 3: {
      result = 'دفع عن طريق المحفظة'
      break
    }
    case 4: {
      result = 'دفع عن طريق النقط'
      break
    }
  }
  return result
}